'use strict';

var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

// Helper for linking to external query files;
function sql(file) {

    var fullPath = path.join(__dirname, file); // generating full path;

    var options = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true,

        // Showing how to use static pre-formatting parameters -
        // we have variable 'schema' in each SQL (as an example);
        params: {
            schema: 'public' // replace ${schema~} with "public"
        }
    };

    return new QueryFile(fullPath, options);

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query and its formatting parameters. However, this is
// very easy to overcome by using only Named Parameters for your query formatting.
////////////////////////////////////////////////////////////////////////////////////////////////

// We import only a few queries here, while using the rest in-line in the code, only to provide a
// diverse example here, but you may just as well put all of your queries into SQL files.

module.exports = {
    /*users: {
        create: sql('users/create.sql'),
        empty: sql('users/empty.sql'),
        init: sql('users/init.sql'),
        drop: sql('users/drop.sql'),
        add: sql('users/add.sql')
    },*/
    products: {
        list: sql('products/list.sql'),
        product_group_list: sql('products/product_group_list.sql'),
        add: sql('products/add.sql'),
        edit: sql('products/edit.sql')
    },
    documents: {
        list: sql('documents/list.sql'),
        add_product_remainder: sql('documents/add.sql'),
        add: sql('documents/add.sql'),
        document_types_list: sql('documents/document_types_list.sql'),
        payment_methods_list: sql('documents/payment_methods_list.sql')
    },
    contractors: {
        list: sql('contractors/list.sql'),
        contractor_group_list: sql('contractors/contractor_group_list.sql'),
        add: sql('contractors/add.sql'),
        edit: sql('contractors/edit.sql')
    },
    finances: {
        finance_operations_list: sql('finances/finance_operations_list.sql'),
        add: sql('finances/add.sql')
    },
    store: {
        store_operations_list: sql('store/store_operations_list.sql'),
        add: sql('store/add.sql')
    },
    reports: {
        products_balance_list: sql('reports/products_balance_list.sql'),
    }
};

//////////////////////////////////////////////////////////////////////////
// Consider an alternative - enumerating all SQL files automatically ;)
// API: http://vitaly-t.github.io/pg-promise/utils.html#.enumSql

/*
// generating a recursive SQL tree for dynamic use of camelized names:
var enumSql = require('pg-promise').utils.enumSql;

module.exports = enumSql(__dirname, {recursive: true}, file=> {
    // NOTE: 'file' contains the full path to the SQL file, because we use __dirname for enumeration.
    return new QueryFile(file, {
        minify: true,
        params: {
            schema: 'public' // replace ${schema~} with "public"
        }
    });
});
*/