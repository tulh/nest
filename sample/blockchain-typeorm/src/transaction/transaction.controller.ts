import {Controller, Get} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {ApiBearerAuth, ApiUseTags, ApiOperation} from '@nestjs/swagger';

@Controller('transaction')
@ApiBearerAuth()
@ApiUseTags('transaction')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService,
    ) {
    }

    @Get()
    @ApiOperation({title: 'find all transaction'})
    default() {
        return this.transactionService.findAll();
    }
}