// Faltan agregar cosas a detallar_inmueble_id




const router = require('express').Router();

const db = require('../database/database');

const password = "ZAQ12wsx";


router.get('/', (req, res) => {
    res.send('Servidor funcionando con exito');
});

// INICIO FUNCIÓN ----- BORRAR DATO TECNICO -----

router.delete('/borrar_dato_tecnico', (req, res) => {
    const { id, pass } = req.body ;
    db.query('DELETE FROM datos_tecnicos WHERE id=?', [id],(err, rows, fields) => {
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

// FINAL FUNCIÓN ----- BORRAR DATO TECNICO -----

// INICIO FUNCIÓN ----- MOSTRAR DATOS TECNICOS -----

router.get('/datos_tecnicos', (req, res) => {
    db.query('SELECT * FROM datos_tecnicos', (err, rows, fields) => {
        if(! err){
            res.send({
                status : true,
                data : rows,
                info : "se muestran todos los datos tecnicos que hay en la DB"
            });
        }else{
            res.send({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- MOSTRAR DATOS TECNICOS -----

// INICIO FUNCIÓN ----- INSERTAR DATOS TECNICOS -----

router.post('/insertar_dato_tecnico', (req, res) => {
    const { pass, idCasa, dormitorios, s_terreno, s_cubierta, s_semicubierta, cochera, pileta } = req.body;
    if (pass == password){
        db.query('INSERT INTO datos_tecnicos(idCasa, dormitorios, s_terreno, s_cubierta, s_semicubierta, cochera, pileta) VALUES (?, ?, ?, ?, ?, ?, ?)', [idCasa, dormitorios, s_terreno, s_cubierta, s_semicubierta, cochera, pileta] , (err, rows, fields) => {
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

// FINAL FUNCIÓN ----- INSERTAR DATOS TECNICOS -----

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
    db.query('SELECT * FROM inmuebles JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id JOIN categorias ON inmuebles.idCategoria = categorias.id', (err, rows, fields) => {
        if(! err){
            res.send({
                status : true,
                data : rows,
                info : "se muestran todas los inmuebles que hay en la DB"
            });
        }else{
            res.send({
                status : false,
                info : err
            });
        }
    });
});

// FINAL FUNCIÓN ----- MOSTRAR INMUEBLES -----

// INICIO FUNCIÓN ----- DETALLAR INMUEBLE X ID-----

router.get('/detallar_inmueble_id', (req, res) => {
    const { id } = req.body;
    if (id != undefined) {
        db.query('SELECT inmuebles.*, ubicacion.partido, ubicacion.localidad, tipo_operacion.operacion, categorias.categoria FROM inmuebles LEFT JOIN ubicacion ON inmuebles.idLocalidad = ubicacion.id LEFT JOIN categorias ON inmuebles.idCategoria = categorias.id LEFT JOIN tipo_operacion ON inmuebles.idOperacion = tipo_operacion.id WHERE inmuebles.id = ?;', [ id ] ,(err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    data : rows ,
                    info : "Se muestran todos los detalles de la casa con ese id"
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
            info : "No has ingresado ningun id para buscar"
        });
    }
});

// FINAL FUNCIÓN ----- DETALLAR INMUEBLE X ID -----


// INICIO FUNCIÓN ----- MODIFICAR INMUEBLE -----

router.put('/modificar_inmueble', (req, res) => {
    const { id, pass,  idOperacion, precio, idLocalidad, direccion, idCategoria, descripcion, estado} = req.body;
    if (pass == password){
        db.query('UPDATE inmuebles SET idOperacion = ?, precio = ?, idLocalidad = ?, direccion = ?, idCategoria = ?, descripcion = ?, estado = ? WHERE id = ?', [idOperacion, precio, idLocalidad, direccion, idCategoria, descripcion, estado, id] , (err, rows, fields) => {
            if(! err){
                res.send({
                    status : true,
                    info : "inmueble modificado con éxito"
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

// FINAL FUNCIÓN ----- MODIFICAR INMUEBLE -----

// INICIO FUNCIÓN ----- BORRAR INMUEBLE -----

router.delete('/borrar_inmueble', (req, res) => {
    const { id, pass } = req.body ;
    db.query('DELETE FROM inmuebles WHERE id = ?', [ id ],(err, rows, fields) => {
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

// FINAL FUNCIÓN ----- BORRAR INMUEBLE -----


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

// INICIO FUNCIÓN ----- MOSTRAR UBICACIÓN -----

// INICIO FUNCIÓN ----- BUSCAR LOCALIDADES -----

router.get('/buscar_localidades', (req, res) => {
    const { partido } = req.body;
    if (partido != undefined) {
        db.query('SELECT * FROM ubicacion WHERE partido LIKE ? ', [ partido ] , (err, rows, fields) => {
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
    }else{
        res.send({
            status : false,
            info : "No has ingresado ningun id para buscar"
        });
    }
});

// FINAL FUNCIÓN ----- BUSCAR LOCALIDADES -----



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

// INICIO FUNCIÓN ----- MOSTRAR CATEGORIAS -----

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

// FINAL FUNCIÓN ----- MOSTRAR CATEGORIAS -----

// INICIO FUNCIÓN ----- BUSCAR CATEGORIA X ID -----

router.get('/buscar_categoria_id', (req, res) => {
    const { id } = req.body;
    if (id != undefined) {
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
    }else{
        res.send({
            status : false,
            info : "No has ingresado ningun id para buscar"
        });
    }
});

// FINAL FUNCIÓN ----- BUSCAR CATEGORIA X ID -----

// INICIO FUNCIÓN ----- BUSCAR CATEGORIA X NOMBRE -----

router.get('/buscar_categoria_nombre', (req, res) => {
    const { categoria } = req.body;
    if (categoria != undefined) {
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
    } else {
        res.send({
            status : false,
            info : "No has ingresado ningun nombre de categoria para buscar"
        });
    }
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