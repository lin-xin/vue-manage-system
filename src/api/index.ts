import request from '../utils/request';
import { User } from '../types/user';
import { TableItem } from '../types/table';
import { Role } from '../types/role';

export interface ListResponse<T> {
    list: T[];
    pageTotal: number;
}

export type TableListResponse = ListResponse<TableItem>;
export type UserListResponse = ListResponse<User>;
export type RoleListResponse = ListResponse<Role>;

export const fetchData = (): Promise<{ data: TableListResponse }> => {
    return request({
        url: './mock/table.json',
        method: 'get'
    }) as Promise<{ data: TableListResponse }>;
};

export const fetchUserData = (): Promise<{ data: UserListResponse }> => {
    return request({
        url: './mock/user.json',
        method: 'get'
    }) as Promise<{ data: UserListResponse }>;
};

export const fetchRoleData = (): Promise<{ data: RoleListResponse }> => {
    return request({
        url: './mock/role.json',
        method: 'get'
    }) as Promise<{ data: RoleListResponse }>;
};
