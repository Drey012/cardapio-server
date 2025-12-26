import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem } from './schemas/menu-item.schema';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItem>,
  ) {}

  /**
   * Criar um novo item do cardápio
   */
  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const createdMenuItem = new this.menuItemModel(createMenuItemDto);
    return createdMenuItem.save();
  }

  /**
   * Obter todos os itens do cardápio
   */
  async findAll(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();
  }

  /**
   * Obter um item específico pelo ID
   */
  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemModel.findById(id).exec();
    if (!menuItem) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }
    return menuItem;
  }

  /**
   * Filtrar itens por categoria
   */
  async findByCategory(categoria: string): Promise<MenuItem[]> {
    return this.menuItemModel
      .find({ categoria: { $regex: categoria, $options: 'i' } })
      .exec();
  }

  /**
   * Buscar itens por nome
   */
  async searchByName(nome: string): Promise<MenuItem[]> {
    return this.menuItemModel
      .find({ nome: { $regex: nome, $options: 'i' } })
      .exec();
  }

  /**
   * Obter todas as categorias únicas
   */
  async findAllCategories(): Promise<string[]> {
    const items = await this.menuItemModel.find().exec();
    const categorias = [...new Set(items.map((item) => item.categoria))];
    return (categorias as string[]).sort();
  }

  /**
   * Atualizar um item do cardápio
   */
  async update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const updatedMenuItem = await this.menuItemModel
      .findByIdAndUpdate(id, updateMenuItemDto, { new: true })
      .exec();

    if (!updatedMenuItem) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }

    return updatedMenuItem;
  }

  /**
   * Deletar um item do cardápio
   */
  async remove(id: string): Promise<MenuItem> {
    const deletedMenuItem = await this.menuItemModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedMenuItem) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }

    return deletedMenuItem;
  }
}
