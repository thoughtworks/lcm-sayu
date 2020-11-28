## Acceso a base de datos para mantenimiento

No es recomendable acceder a la base de datos de otra forma que no sea desde la misma aplicación. Dado que el servidor de base de datos esta dentro de la red privada de la infraestructura (https://github.com/dsantibanezvera/lcm-sayu-infra) ingresar a ella desde internet abierto no es posible a no ser que se exponga a internet comprometiendo severamente la seguridad. Si no existe otra opción para la tarea que se debe realizar, tanto de operación como mantenimiento, más que acceder a ella de forma manual entonces la mejor opción es crear una máquina bastion (https://en.wikipedia.org/wiki/Bastion_host).

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
