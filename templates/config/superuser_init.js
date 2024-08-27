 var isMaster = rs.isMaster().ismaster;
 if(!isMaster) { quit(); }
db = db.getSiblingDB('admin');
 sleep(5000);

var user = {
    "pwd" : "{{ mongodb_superuser_password }}",
    "roles" : [ "root" , "__system", "clusterAdmin", "clusterManager", "clusterMonitor", { role: "__system", db: "admin" }, { role: "root", db: "admin" }, { role: "clusterAdmin", db: "admin" }, { role: "clusterManager", db: "admin" }, { role: "clusterMonitor", db: "admin" } ]
};

user.user = "{{ mongodb_superuser }}";
db.createUser(user);
print('{{ mongodb_superuser }} user created');
