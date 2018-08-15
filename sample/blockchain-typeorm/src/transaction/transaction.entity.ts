import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  RECEIPT = 'RECEIPT',
  PENDING = 'PENDING',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  PURCHASE = 'PURCHASE',
  WITHDRAW = 'WITHDRAW',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'datetime' })
  createTime: Date;
  @UpdateDateColumn({ type: 'datetime' })
  updatedDate: Date;
  @VersionColumn({ nullable: false })
  version: number;
  @Column({ nullable: false, unique: true })
  txHash: string;
  @Column({ default: null })
  from: string;
  @Column({ default: null })
  to: string;
  @Column({ type: 'decimal', precision: 18, scale: 9, nullable: false, default: 0.000000000 })
  value: number;
  @Column({ type: 'enum', enum: TransactionStatus, nullable: false })
  status: TransactionStatus;
  @Column({ nullable: false })
  userid: string;
  @Column({ type: 'enum', enum: TransactionType, nullable: false })
  type: TransactionType;
  @Column({ nullable: false, default: 0 })
  totalConfirmed: number;
}
