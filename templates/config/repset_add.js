// todo check if use auth
var isMaster = rs.isMaster().ismaster;
if(!isMaster) { quit(); }
rs.slaveOk();
var hostRsMembers = {};
var newRsMembers = [];
var ix = 0;

// add members
{% for host in mongodb_group_hosts %}

var localIp = "{{ hostvars[host].ansible_default_ipv4.address }}";
var hostDSN = localIp + ":{{ mongodb_bind_port| default('27017') }}";
hostRsMembers[hostDSN] = hostDSN;

var hostNr = {{ hostvars[host].Nr | int | default(1) }};
if(hostNr == 0)
{
    priorityNumber = 1;
}else{
    priorityNumber = 0.5;
}

newRsMembers[ix] = {_id: ix, host: hostDSN, priority: priorityNumber};
rs.add({host: hostDSN, priority: priorityNumber});
sleep(3000);
ix++;
{% endfor %}

cfg = rs.conf();
cfg.members = newRsMembers;
printjson(cfg.members);
rs.reconfig(cfg,{ force: true });

printjson(rs.conf());
print('replica set done');
