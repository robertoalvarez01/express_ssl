/*

    EN ESTE ARCHIVO SE REALIZAN LAS FUNCIONES DE INSERTAR,
    BORRAR, ACTUALIZAR Y ENLISTAR LOS OBJETOS:

    - CATEGORIAS

    - UBICACIONES

    - TIPOS DE OPERACIÓN

*/


const router = require('express').Router();

const db = require('../database/database');

const password = "ZAQ12wsx";

// INICIO FUNCIÓN ----- INSERTAR INMUEBLES -----

router.post('/insertar_inmueble', (req, res) => {
    const { idOperacion, precio, idLocalidad, direccion, idCategoria, descripcion, estado, pass } = req.body;
    if (pass == password){
        db.query('INSERT INTO inmuebles(idOperacion, precio, idLocalidad, direccion, idCategoria, descripcion, estado) VALUES (? , ?, ?, ? , ?, ?, ?)', 
        [idOperacion, precio, idLocalidad, direccion, idCategoria, descripcion, estado ] , 
        (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "operacion insertada con éxito"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        });
    }else{
        res.send({
            status : false,
            info : "la contraseña ingresada no es compatible"
        });
    }
});

// FINAL FUNCIÓN ----- INSERTAR INMUEBLES -----

// INICIO FUNCIÓN ----- MOSTRAR INMUEBLES -----

router.get('/listar_inmuebles', (req, res) => {
    db.query('SELECT * FROM inmuebles JOIN ubicacion WHERE inmuebles.idLocalidad = ubicacion.id', (err, rows, fields) => {
        if(! err){
            res.send({
                status : true,
                data : rows,
                info : "se muestran todas los inmuebles que hay en la DB"
            });
        }else{
            console.log({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- MOSTRAR INMUEBLES -----


// INICIO FUNCIÓN ----- BORRAR UBICACIÓN -----

router.delete('/borrar_ubicacion', (req, res) => {
    const { id, pass } = req.body ;
    db.query('DELETE FROM ubicacion WHERE id=?', [id],(err, rows, fields) => {
        if(pass == password){
            if(! err){
                res.send({
                    status : true,
                    info : "se ha borrado con éxito el registro"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        }else {
            res.send({
                status : false,
                info : "la contraseña ingresada no es compatible"
            });
        }
    });
});

// FINAL FUNCIÓN ----- BORRAR UBICACIÓN -----

// INICIO FUNCIÓN ----- MOSTRAR UBICACIÓN -----

router.get('/ubicaciones', (req, res) => {
    db.query('SELECT * FROM ubicacion', (err, rows, fields) => {
        if(! err){
            res.send({
                status : true,
                data : rows,
                info : "se muestran todas las ubicaciones que hay en la DB"
            });
        }else{
            res.send({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- MOSTRAR UBICACIÓN -----



// INICIO FUNCIÓN ----- INSERTAR UBICACIÓN -----

router.post('/insertar_ubicacion', (req, res) => {
    const { partido, localidad, pass } = req.body;
    if (pass == password){
        db.query('INSERT INTO ubicacion(partido, localidad) VALUES (? , ?)', [partido, localidad] , (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "operacion insertada con éxito"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        });
    }else{
        res.send({
            status : false,
            info : "la contraseña ingresada no es compatible"
        });
    }
});

// FINAL FUNCIÓN ----- INSERTAR UBICACIÓN -----

// INICIO FUNCIÓN ----- MODIFICAR UBICACIÓN -----

router.put('/modificar_ubicacion', (req, res) => {
    const { id, partido, localidad, pass } = req.body;
    if (pass == password){
        db.query('UPDATE ubicacion SET partido = ? , localidad = ? WHERE id = ?', [partido, localidad, id] , (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "ubicacion modificada con éxito"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        });
    }else{
        res.send({
            status : false,
            info : "la contraseña ingresada no es compatible"
        });
    }
});

// FINAL FUNCIÓN ----- MODIFICAR UBICACIÓN -----


// INICIO FUNCIÓN ----- BORRAR TIPO DE OPERACIÓN -----

router.delete('/borrar_operacion', (req, res) => {
    const { id, pass } = req.body ;
    db.query('DELETE FROM tipo_operacion WHERE id=?', [id],(err, rows, fields) => {
        if(pass == password){
            if(! err){
                res.send({
                    status : true,
                    info : "se ha borrado con éxito el registro"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        }else {
            res.send({
                status : false,
                info : "la contraseña ingresada no es compatible"
            });
        }
    });
});

// FINAL FUNCIÓN ----- BORRAR TIPO DE OPERACIÓN -----

// INICIO FUNCIÓN ----- MOSTRAR TIPO DE OPERACIÓN -----

router.get('/operaciones', (req, res) => {
    db.query('SELECT * FROM tipo_operacion', (err, rows, fields) => {
        if(! err){
            res.send({
                status : true,
                data : rows,
                info : "se muestran todas las operaciones que hay en la DB"
            });
        }else{
            res.send({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- MOSTRAR TIPO DE OPERACIÓN -----



// INICIO FUNCIÓN ----- INSERTAR TIPO DE OPERACIÓN -----

router.post('/insertar_operacion', (req, res) => {
    const { operacion, pass } = req.body;
    if (pass == password){
        db.query('INSERT INTO tipo_operacion(operacion) VALUES (?)', [operacion] , (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "operacion insertada con éxito"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        });
    }else{
        res.send({
            status : false,
            info : "la contraseña ingresada no es compatible"
        });
    }
});

// FINAL FUNCIÓN ----- INSERTAR TIPO DE OPERACIÓN -----

// INICIO FUNCIÓN ----- MODIFICAR TIPO DE OPERACIÓN -----

router.put('/modificar_operacion', (req, res) => {
    const { id, operacion, pass } = req.body;
    if (pass == password){
        db.query('UPDATE tipo_operacion SET operacion = ? WHERE id = ?', [operacion, id] , (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "operacion modificada con éxito"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        });
    }else{
        res.send({
            status : false,
            info : "la contraseña ingresada no es compatible"
        });
    }
});

// FINAL FUNCIÓN ----- MODIFICAR TIPO DE OPERACIÓN -----


// INICIO FUNCIÓN ----- BORRAR CATEGORIA -----

router.delete('/borrar_categoria', (req, res) => {
    const { id, pass } = req.body ;
    db.query('DELETE FROM categorias WHERE id=?', [id],(err, rows, fields) => {
        if(pass == password){
            if(! err){
                res.send({
                    status : true,
                    info : "se ha borrado con éxito el registro"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        }else {
            res.send({
                status : false,
                info : "la contraseña ingresada no es compatible"
            });
        }
    });
});

// FINAL FUNCIÓN ----- BORRAR CATEGORIA -----

// INICIO FUNCIÓN ----- MOSTRAR CATEGORIA -----

router.get('/categorias', (req, res) => {
    db.query('SELECT * FROM categorias', (err, rows, fields) => {
        if(! err){
            res.send({
                status : true,
                data : rows,
                info : "se muestran todas las categorias que hay en la DB"
            });
        }else{
            res.send({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- MOSTRAR CATEGORIA -----

// INICIO FUNCIÓN ----- BUSCAR CATEGORIA X ID -----

router.get('/buscar_categoria_id', (req, res) => {
    const { id } = req.body;
    db.query('SELECT * FROM categorias WHERE id LIKE ? ', [ id ] , (err, rows, fields) => {
        if(! err){
            console.log(rows);
            res.send({
                status : true,
                data : rows,
                info : "se muestran todas las categorias con ese id que hay en la DB"
            });
        }else{
            res.send({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- BUSCAR CATEGORIA X ID -----

// INICIO FUNCIÓN ----- BUSCAR CATEGORIA X NOMBRE -----

router.get('/buscar_categoria_nombre', (req, res) => {
    const { categoria } = req.body;
    db.query('SELECT * FROM categorias WHERE categoria LIKE ? ', [ categoria ] , (err, rows, fields) => {
        if(! err){
            console.log(rows);
            res.send({
                status : true,
                data : rows,
                info : "se muestran todas las categorias con ese nombre que hay en la DB"
            });
        }else{
            res.send({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- BUSCAR CATEGORIA X NOMBRE -----

// INICIO FUNCIÓN ----- INSERTAR CATEGORIA -----

router.post('/insertar_categoria', (req, res) => {
    const { categoria, pass } = req.body;
    if (pass == password){
        db.query('INSERT INTO categorias(categoria) VALUES (?)', [categoria] , (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "categoria insertada con éxito"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        });
    }else{
        res.send({
            status : false,
            info : "la contraseña ingresada no es compatible"
        });
    }
});

// FINAL FUNCIÓN ----- INSERTAR CATEGORIA -----


// INICIO FUNCIÓN ----- MODIFICAR CATEGORIA -----

router.put('/modificar_categoria', (req, res) => {
    const { id, categoria, pass } = req.body;
    if (pass == password){
        db.query('UPDATE categorias SET categoria = ? WHERE id = ?', [categoria, id] , (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "categoria modificada con éxito"
                });
            }else{
                res.send({
                    status : false,
                    info : err
                });
            }
        });
    }else{
        res.send({
            status : false,
            info : "la contraseña ingresada no es compatible"
        });
    }
});

// FINAL FUNCIÓN ----- MODIFICAR CATEGORIA -----

module.exports = router;