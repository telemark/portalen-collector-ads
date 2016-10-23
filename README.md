# portalen-collector-ads
Collects ads for portalen

## Messages handled

### ```cmd: collect-info, type: user```

Collects content for a user and/or a user's roles

```JavaScript
seneca.act({cmd: 'collect-info', type:'user', user:user, roles:[roles]}, (error, data) => {})
```

```sh
curl -d '{"cmd": "collect-info", "type":"user", "user":"gasg", "roles": ["alle", "administrasjonen"]}' -v http://localhost:8000/act
```

## Messages emitted

### ```role: info, info: content-collected```

Contains collected info for user/role wrapped in the data property

```JavaScript
{
    system: 'ads',
    type: 'ads',
    user: user,
    data: [] //collected info
  }
```

## License
[MIT](LICENSE)