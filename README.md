# PROYECTO PARA REGISTRO DE DOLOR DE SAYU

Este proyecto es para registrar nivel de dolor de pacientes

## Acceso a base de datos para mantenimiento

No es recomendable acceder a la base de datos de otra forma que no sea desde la misma aplicación. Dado que el servidor de base de datos esta dentro de la red privada de la infraestructura (https://github.com/dsantibanezvera/lcm-sayu-infra) ingresar a ella desde internet abieto no es posible a no ser que se exponga a internet comprometiendo severamente la seguridad. Si no existe otra opción para la tarea, tanto de operación como mantenimiento, que se debe realizar más que acceder a ella de forma manual entonces la mejor opción es crear una máquina bastion (https://en.wikipedia.org/wiki/Bastion_host).

1. Ingrese a AWS con sus credenciales otorgadas
2. Cree una maquina virtual (en AWS utilice EC2) lo más pequeña posible para mantener los costos de su infraestructura sin grandes cambios (utilice las opciones de máquinas gratuitas de AWS)
3. Configure la máquina para aceptar conexiones al puerto 22 desde internet pública sólo desde su ip pública (configure esta ip cerca del momento en que ocurra la conexión en caso que tenga ip dinámica)
4. Procure crear un par de claves (key par) que sólo Ud. pueda utilizar para posteriormente utilizarlas al ingresar a la máquina mediante SSH
5. Al configurar su máquina agrégela a la VPC de su infraestructura y asignele un nuevo security group
6. Configure su servicio de base de datos (para Sayu es AWS RDS) para aceptar conexiones desde el security group asociado a la máquina creada
7. Ingrese a la máquina creada mediante SSH utilizando sus claves generadas y conéctese a la base de datos con las credenciales y string de conexión que haya configurado anteriormente (verifique que la máquina virtual provea de cliente de consola para la base de datos que se utilice, en caso de Sayu es Postgresql)
8. Realice las tareas que requiera y al terminar elimine la máquina creada
