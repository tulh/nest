import { Module } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
})
export class WalletModule {}