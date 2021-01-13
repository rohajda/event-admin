/* eslint-disable max-classes-per-file */
import { BaseEntity } from './base.entity';
import { Expose as JsonProperty, Type } from 'class-transformer';

export class Sort {
    private sortList: string[];

    constructor(sort: string) {
        let stringSort = '';

        if (typeof sort === 'string') {
            stringSort = sort;
        } else {
            stringSort = sort + '';
        }

        if (stringSort) {
            this.sortList = stringSort.split(',');
        }
    }

    asOrder(): any {
        const order = {};
        let tmpBuffer = '';

        this.sortList.forEach(value => {
            if (tmpBuffer && (value.toUpperCase() === 'ASC' || value.toUpperCase() === 'DESC')) {
                order[tmpBuffer] = value.toUpperCase();
                tmpBuffer = null;
            } else if (tmpBuffer && !(value.toUpperCase() === 'ASC' || value.toUpperCase() === 'DESC')) {
                order[tmpBuffer] = 'ASC';
                tmpBuffer = value;
            } else {
                tmpBuffer = value;
            }
        });
        if (tmpBuffer) {
            order[tmpBuffer] = 'ASC';
        }

        return order;
    }
}

export class PageRequest {
    @JsonProperty()
    page = 0;
    @JsonProperty()
    size = 20;
    @Type(() => Sort)
    sort: Sort = new Sort('id,ASC');

    constructor(page: number | string, size: number | string, sort: string) {
        this.page = +page || this.page;
        this.size = +size || this.size;
        this.sort = sort ? new Sort(sort) : this.sort;
    }
}

export class Page<T extends BaseEntity> {
    constructor(public content: T[], public total: number, public pageable: PageRequest) {
    }
}
