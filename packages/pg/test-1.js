const { Pool, Client } = require('pg')
// const isMd5 = false
// const client = true

const ogConfig = {
  user: 'gaussdb',
  database: 'postgres',
  password: 'Gw_169@Gauss7',
  host: '127.0.0.1',
  port: 8000,
}
// dsn := "host=127.0.0.1 user=gaussdb password=Gw_169@Gauss7 dbname=postgres port=8000 sslmode=disable"
async function run() {
  const pool = new Pool(ogConfig)
  const client = new Client(ogConfig)

  let now = Date.now()
  await client.connect()
  console.log('client connected')
  client.query(`CREATE TABLE test
    (
        c_customer_sk             integer
    );`)
  client.query('insert into test values(1111)', (err, res) => {
    console.log(res)
  })

  client.query('update test set c_customer_sk = 2222', (err, res) => {
    console.log(res)
  })
  client.query('SELECT * FROM test;', (err, res) => {
    console.log(res)
  })
  client.query('delete from test where c_customer_sk = 2222', (err, res) => {
    console.log(res)
  })
  client.query('SELECT * FROM test;', (err, res) => {
    console.log(res)
  })
  client.query('DROP TABLE test;').then(() => {
    client.end()
    console.log('\n\x1b[32mAll queries & client ended process complete in \x1b[1m' + (Date.now() - now) + ' ms')
  })
}
run()
