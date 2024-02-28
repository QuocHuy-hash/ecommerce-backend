const mysql = require('mysql2');


const pool = mysql.createPool({
    user: 'root',
    password: '12345678',
    database: 'nodejs',
    port: '3306',
    host: 'localhost',
});

const batchSize = 100000;
const totalSize = 10000000;

let curentId = 1;
console.time("Timer ::: ");
const InsertBatch = () => {
    const values = [];
    for (let i = 0; i < batchSize && curentId <= totalSize; i++) {
        const name = `name- ${curentId}`;
        const age = curentId;
        const address = `address- ${curentId}`;
        values.push([name, age, address]);
        curentId++;
    }

    if (!values.length) {
        console.timeEnd("Timer ::: ");
        pool.end(err => {
            if (err) {
                console.log("Test :: error not end connection mysql ", err);
            } else {
                console.log("Test :: end connection mysql successfully");
            }
        });
        return;
    }
    const query = `insert into test_insert_data (name , age , address) values ?;`;

    pool.query(query, [values], async function (err, results) {
        if (err) throw err;
        console.log(`Test :: insert ${results.affectedRows}  records`);
        await InsertBatch()
    });
}
InsertBatch();

// result Timer ::: : 6.916s insert 1.000.000 row
//        Timer ::: : 1:28.271 (m:ss.mmm) insert 10.000.000 row