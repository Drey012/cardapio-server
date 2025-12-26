import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

/*Adicione um endpoint '/health' para conferir se o servidor está online*/
@Controller('health')
export class HealthController {
  @Get()
  checkHealth(): string {
    return 'OK';
  }
}

@Controller('api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * POST /api/menu
   * Criar um novo item do cardápio
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    const item = await this.menuService.create(createMenuItemDto);
    return {
      success: true,
      data: item,
      message: 'Item criado com sucesso',
    };
  }

  /**
   * GET /api/menu
   * Obter todos os itens do cardápio
   */
  @Get()
  async findAll() {
    const items = await this.menuService.findAll();
    return {
      success: true,
      data: items,
      count: items.length,
    };
  }

  /**
   * GET /api/menu/categorias/lista
   * Obter todas as categorias disponíveis
   */
  @Get('categorias/lista')
  async findAllCategories() {
    const categorias = await this.menuService.findAllCategories();
    return {
      success: true,
      data: categorias,
      count: categorias.length,
    };
  }

  /**
   * GET /api/menu/categoria/:categoria
   * Filtrar itens por categoria
   */
  @Get('categoria/:categoria')
  async findByCategory(@Param('categoria') categoria: string) {
    const items = await this.menuService.findByCategory(categoria);
    if (items.length === 0) {
      return {
        success: false,
        message: 'Nenhum item encontrado para esta categoria',
      };
    }
    return {
      success: true,
      data: items,
      count: items.length,
      categoria,
    };
  }

  /**
   * GET /api/menu/busca/:nome
   * Buscar itens por nome
   */
  @Get('busca/:nome')
  async searchByName(@Param('nome') nome: string) {
    const items = await this.menuService.searchByName(nome);
    if (items.length === 0) {
      return {
        success: false,
        message: 'Nenhum item encontrado com este nome',
      };
    }
    return {
      success: true,
      data: items,
      count: items.length,
      busca: nome,
    };
  }

  /**
   * GET /api/menu/:id
   * Obter um item específico pelo ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.menuService.findOne(id);
    return {
      success: true,
      data: item,
    };
  }

  /**
   * PUT /api/menu/:id
   * Atualizar um item do cardápio
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    const item = await this.menuService.update(id, updateMenuItemDto);
    return {
      success: true,
      data: item,
      message: 'Item atualizado com sucesso',
    };
  }

  /**
   * DELETE /api/menu/:id
   * Deletar um item do cardápio
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const item = await this.menuService.remove(id);
    return {
      success: true,
      data: item,
      message: 'Item deletado com sucesso',
    };
  }
}
