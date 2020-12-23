# Persistencia

## Acceso a base de datos para mantenimiento

No es recomendable acceder a la base de datos de otra forma que no sea desde la misma aplicación. Dado que el servidor de base de datos esta dentro de la red privada de la [infraestructura](https://github.com/dsantibanezvera/lcm-sayu-infra) ingresar a ella desde internet abierto no es posible a no ser que se exponga a internet comprometiendo severamente la seguridad. Si no existe otra opción para la tarea que se debe realizar, tanto de operación como mantenimiento, más que acceder a ella de forma manual entonces la mejor opción es crear una [máquina bastion](https://en.wikipedia.org/wiki/Bastion_host).

1. Ingrese a AWS con sus credenciales otorgadas
1. Cree una maquina virtual (en AWS utilice EC2) lo más pequeña posible para mantener los costos de su infraestructura sin grandes cambios (utilice las opciones de máquinas gratuitas de AWS) ![Usando una máquina ec2 gratuita](img/select-free-instance.png 'select free instance')
1. Al configurar su máquina, incorporela a la VPC de su infraestructura y dentro de una de las subredes públicas ![Asignación VPC](img/add-ec2-to-vpc.png 'add ec2 to vpc')
1. Asígnele un nuevo security group ![Creación securiry group](img/create-ec2-security-group.png 'create ec2 security group')
1. Configure la máquina para aceptar conexiones al puerto 22 desde internet pública sólo desde su ip pública (configure esta ip cerca del momento en que ocurra la conexión en caso que tenga ip dinámica) ![Configuración puerto 22](img/set-ssh-access.png 'set ssh access')
1. Procure crear un par de claves (key par) que sólo Ud. pueda usar para posteriormente permitir ingreso a la máquina mediante SSH ![Creación key par](img/create-key-pair.png 'create key pair')
   ![Descargar key par](img/download-key-pair.png 'download key pair')
1. Configure su servicio de base de datos (para Sayu es AWS RDS) para aceptar conexiones desde el security group asociado a la máquina creada ![Configurar regla de entrada](img/edit-inbound-rules.png 'edit inbound rules')
   ![Crear regla de entrada](img/set-security-group-access.png 'set security group access')
1. Ingrese a la máquina creada mediante SSH utilizando sus claves generadas y la ip pública de aquella máquina ![Ingresar a instancia](img/connect-to-instance.png 'connect to instance')
1. Conéctese a la base de datos con las credenciales y string de conexión que haya configurado anteriormente (verifique que la máquina virtual provea de cliente de consola para la base de datos que se utilice, en caso de Sayu es Postgresql)
1. Realice las tareas que requiera y al terminar elimine la máquina creada

## TypeORM

[TypeORM](https://typeorm.io/#/) es la librería para la base de datos que estamos usando. Esta librería funciona con typescript mediante anotaciones (muy parecido a JPA).
Dado que estamos utilizando [NextJS](https://nextjs.org/), y este tiene su propia fórmula de compilación, TypeORM trata de cargar archivos JS que deberían estar compilados, pero no lo están. Por tanto, para poder hacer un workaround de este problema, decidimos escribir las entidades de base de datos en JS a través del entity manager. Si quieres agregar una nueva relación, debes crear un archivo JS dentro de la carpeta src/entity describiendo la tabla.

Ejemplo: `src/entity/User.js`

```js
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'allowed_users',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: true,
    },
    name: {
      type: 'text',
      nullable: true,
    },
    email: {
      type: 'text',
      unique: true,
    },
    role: {
      type: 'text',
    },
    status: {
      type: 'text',
    },
    createdAt: {
      type: 'timestamp',
    },
  },
  relations: {
    registries: {
      target: 'Registry',
      type: 'one-to-many',
      joinTable: true,
      cascade: true,
    },
  },
})
```

Dado que nuestras entidades están escritas en JS, para trabajarlas con TypeORM en typescript, cuando creamos un repositorio debemos definirle el tipo del modelo.

Ejemplo `src/model/User.ts`

```ts
export class User {
  readonly createdAt = new Date(Date.now())
  public id?: number
  public name?: string
  readonly email: string
  readonly role: Role
  readonly status: Status
  constructor(email: string, role: string, status: string) {
    this.email = this.getValidEmail(email)
    this.role = this.getValidRole(role)
    this.status = this.getValidStatus(status)
  }
}
```

Modelo que copia los mismo atributos que la entidad.

Ejemplo: `src/services/UserService.ts#getByEmail`

```ts
 async getByEmail(email: string): Promise<User | undefined> {
    const connection = await this.getConnection()
    try {
      const validEmail = getValidEmail(email)
      const userRepository = connection.getRepository<User>('User')
      const user = await userRepository.findOne({ email: validEmail })
      return user
    } finally {
      connection.close()
    }
  }
```

Cuando se obtiene el repositorio, se le pasa como parametro el `name` de la entidad con la que queremos trabajar que en este caso es `'User'`, al mismo tiempo que definimos el tipo de modelo typescript con el que vamos a trabajar, por ejemplo, `<User>`.

## Migraciones

Cuando hacemos modificaciones a nuestros entities o agregamos una nueva entity en la carpeta `src/entity`, TypeORM podrá crearnos las migraciones correspondientes. Primero debes asegurarte de que tienes una base de datos funcionando y que sea consistente con todas las migraciones generadas hasta el momento. Luego, puedes correr el siguiente comando:

```shell
yarn migration:generate my-migration
```

Con este comando se revisarán todas las diferencias entre las migraciones ejecutadas y la base de datos y se generará una nueva migración con la nueva información dentro de la carpeta `migrations`. El formato de la migración debe ser en minúscula con `dash-case`.

Ejemplo `/migrations/1608666235798-creation-date-index.ts`

```ts
import { MigrationInterface, QueryRunner } from 'typeorm'

export class creationDateIndex1608666235798 implements MigrationInterface {
  name = 'creationDateIndex1608666235798'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX "IDX_cad39e0f746139cc27f8c34555" ON "registry" ("creationDate")
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "IDX_cad39e0f746139cc27f8c34555"
        `)
  }
}
```

Luego, para ejecutar las migraciones pendientes, basta con:

```shell
yarn migration:run
```
