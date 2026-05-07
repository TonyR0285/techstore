exports.register = (req, res) => {
  const { nombre, correo, password } = req.body;
  if (!nombre || !correo || !password)
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  // En producción: hashear password con bcryptjs y guardar en BD
  res.status(201).json({ mensaje: 'Usuario registrado correctamente', correo });
};

exports.login = (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password)
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  // En producción: verificar BD y retornar JWT
  res.json({ mensaje: 'Login exitoso', token: 'jwt-token-aqui', rol: 'cliente' });
};
