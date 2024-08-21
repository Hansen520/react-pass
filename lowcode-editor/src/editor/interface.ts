/*
 * @Date: 2024-08-21 10:45:37
 * @Description: description
 */
import { PropsWithChildren } from 'react';

export interface CommonComponentProps extends PropsWithChildren {
    id: number;
    name: string;
    [key: string]: any;
}