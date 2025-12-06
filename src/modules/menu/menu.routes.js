// 🌐 ROUTES: Definição dos Endpoints da API
// Mapeia as requisições HTTP para os métodos do controller

const express = require('express');
const router = express.Router();
const menuController = require('./menu.controller');

/**
 * GET /menu
 * Retorna todos os itens do cardápio
 */
router.get('/', (req, res) => {
  try {
    const items = menuController.getAllItems();
    res.status(200).json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar itens do cardápio',
      error: error.message
    });
  }
});

/**
 * NOTE: rota de detalhe `/menu/:id` é registrada ao final do arquivo
 * para evitar conflito com rotas específicas (categoria/busca/categorias).
 */

/**
 * GET /menu/categoria/:categoria
 * Filtra itens por categoria
 */
router.get('/categoria/:categoria', (req, res) => {
  try {
    const items = menuController.getItemsByCategory(req.params.categoria);
    
    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nenhum item encontrado para esta categoria'
      });
    }

    res.status(200).json({
      success: true,
      data: items,
      count: items.length,
      categoria: req.params.categoria
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao filtrar itens por categoria',
      error: error.message
    });
  }
});

/**
 * GET /menu/busca/:nome
 * Busca itens por nome
 */
router.get('/busca/:nome', (req, res) => {
  try {
    const items = menuController.searchItemsByName(req.params.nome);
    
    if (items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nenhum item encontrado com este nome'
      });
    }

    res.status(200).json({
      success: true,
      data: items,
      count: items.length,
      busca: req.params.nome
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar itens',
      error: error.message
    });
  }
});

/**
 * GET /menu/categorias/lista
 * Retorna todas as categorias disponíveis
 */
router.get('/categorias/lista', (req, res) => {
  try {
    const categorias = menuController.getAllCategories();
    res.status(200).json({
      success: true,
      data: categorias,
      count: categorias.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar categorias',
      error: error.message
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    const item = menuController.getItemById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar item',
      error: error.message
    });
  }
});

module.exports = router;
