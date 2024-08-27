 var isMaster = rs.isMaster().ismaster;
 if(!isMaster) { quit(); }
rs.slaveOk();
sleep(5000);

db = db.getSiblingDB('admin');
db.getMongo().setSlaveOk();

db.system.users.find();
db.getCollectionNames();

{% for user in mongodb_users %}
var dbUser = db.getUser("{{ user.username }}");
var user = {
    "pwd" : "{{ user.password }}",
    roles : {{user.roles | default([]) | to_json}}
};

if(!dbUser) {
    user.user = "{{ user.username }}";
    db.createUser(user);
    print('{{ user.username }} user created');

} else {
    db.updateUser("{{ user.username }}" ,user);
    print('{{ user.username }} user updated');

}

print(user.user);
{% endfor %}
