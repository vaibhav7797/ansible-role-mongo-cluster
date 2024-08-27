 var isMaster = rs.isMaster().ismaster;
 if(!isMaster) { quit(); }
rs.slaveOk();
sleep(5000);
db = db.getSiblingDB('admin');

var user = {
    "pwd" : "{{ mongodb_superuser_password }}",
    "roles" : [ "root" , "__system", "clusterAdmin", "clusterManager", "clusterMonitor", { role: "__system", db: "admin" }, { role: "root", db: "admin" }, { role: "clusterAdmin", db: "admin" }, { role: "clusterManager", db: "admin" }, { role: "clusterMonitor", db: "admin" } ]
};


db.updateUser("{{ mongodb_superuser }}" ,user);
print('{{ mongodb_superuser }} user updated');
