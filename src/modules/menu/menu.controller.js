// 🧠 CONTROLLER: Lógica de Negócio do Cardápio
// Responsável por processar requisições e retornar dados

const menuData = require('./menu.data');

class MenuController {
  /**
   * Retorna todos os itens do cardápio
   * @returns {Array} Lista completa de itens
   */
  getAllItems() {
    return menuData;
  }

  /**
   * Retorna um item específico pelo ID
   * @param {number} id - ID do item
   * @returns {Object|null} Item encontrado ou null
   */
  getItemById(id) {
    return menuData.find(item => item.id === parseInt(id)) || null;
  }

  /**
   * Filtra itens por categoria
   * @param {string} categoria - Nome da categoria
   * @returns {Array} Itens da categoria especificada
   */
  getItemsByCategory(categoria) {
    return menuData.filter(item => 
      item.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  /**
   * Busca itens por nome (busca parcial)
   * @param {string} nome - Termo de busca
   * @returns {Array} Itens que correspondem ao termo
   */
  searchItemsByName(nome) {
    return menuData.filter(item => 
      item.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  /**
   * Retorna todas as categorias disponíveis
   * @returns {Array} Lista de categorias únicas
   */
  getAllCategories() {
    const categorias = [...new Set(menuData.map(item => item.categoria))];
    return categorias.sort();
  }
}

module.exports = new MenuController();
