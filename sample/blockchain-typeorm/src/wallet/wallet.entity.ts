import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export enum WalletType {
  ETH = 'ETH',
}

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({type: 'datetime' })
  createTime: Date;
  @UpdateDateColumn({type: 'datetime' })
  updatedDate: Date;
  @VersionColumn({ nullable: false })
  version: number;
  @Column({ nullable: false, unique: true })
  address: string;
  @Column({ nullable: false })
  privateKey: string;
  @Column({ nullable: false })
  userid: number;
  @Column({ type: 'enum', enum: WalletType, nullable: false })
  type: WalletType.ETH;

}
