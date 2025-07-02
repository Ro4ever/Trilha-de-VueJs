const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    // Opcional: Adicionar lógica de paginação, busca e filtro aqui se o banco de dados for muito grande
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err.message);
    res.status(500).send('Erro no servidor.');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Produto não encontrado.' });
    }
    res.json(product);
  } catch (err) {
    console.error('Erro ao buscar produto por ID:', err.message);
    res.status(500).send('Erro no servidor.');
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, category, imageUrl, description } = req.body;
  try {
    // Validação básica
    if (!name || !price || !category) {
      return res.status(400).json({ msg: 'Nome, preço e categoria são obrigatórios.' });
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      return res.status(400).json({ msg: 'Preço inválido.' });
    }

    const newProduct = await Product.create({
      name,
      price: parseFloat(price), // Garante que o preço é um número
      category,
      imageUrl,
      description,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Erro ao criar produto:', err.message);
    res.status(500).send('Erro no servidor.');
  }
};

exports.updateProduct = async (req, res) => {
  const { name, price, category, imageUrl, description } = req.body;
  try {
    let product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Produto não encontrado.' });
    }

    // Validação básica para update
    if (price && (isNaN(price) || parseFloat(price) <= 0)) {
        return res.status(400).json({ msg: 'Preço inválido.' });
    }

    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? parseFloat(price) : product.price;
    product.category = category !== undefined ? category : product.category;
    product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
    product.description = description !== undefined ? description : product.description;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err.message);
    res.status(500).send('Erro no servidor.');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Produto não encontrado.' });
    }

    await product.destroy();
    res.json({ msg: 'Produto removido com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir produto:', err.message);
    res.status(500).send('Erro no servidor.');
  }
};