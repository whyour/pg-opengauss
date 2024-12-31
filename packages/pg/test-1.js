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
  await pool.connect()
  console.log('client connected')
  const result = await pool.query('SELECT $1::text as name', ['brianc'])
  console.log('poolQuery', result.rows[0].name) // brianc

  const tableResult = await client.query(`CREATE TABLE IF NOT EXISTS test
    (
        c_customer_sk             integer
    );`)
  console.log('tableResult', tableResult)
  const insertResult = await client.query('insert into test values(1111)')
  console.log('insertResult', insertResult)
  const updateResult = await client.query('update test set c_customer_sk = 2222')
  console.log('updateResult', updateResult)
  const selectResult = await client.query('SELECT * FROM test;')
  console.log('selectResult', selectResult)
  const deleteResult = await client.query('delete from test where c_customer_sk = 2222')
  console.log('deleteResult', deleteResult)
  const reSelectResult = await client.query('SELECT * FROM test;')
  console.log('reSelectResult', reSelectResult)
  const dropResult = await client.query('DROP TABLE test;')
  console.log('dropResult', dropResult)
  await client.end()
  await pool.end()
  console.log('\n\x1b[32mAll queries & client ended process complete in \x1b[1m' + (Date.now() - now) + ' ms')
}

run()
