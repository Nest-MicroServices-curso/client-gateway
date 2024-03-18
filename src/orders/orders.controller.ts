import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  async findAllOrders( @Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const order = await firstValueFrom(
        this.client.send('findAllOrders', orderPaginationDto)
      );
      return order;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get('id/:id')
  async findOneOrder(@Param('id', ParseUUIDPipe) id: string ) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', {id})
      );
      return order;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      return this.client.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status
      });
      
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.client.send('changeOrderStatus', {
        id,
        status: statusDto.status
      });
      
    } catch (error) {
      throw new RpcException(error)
    }
  }
}