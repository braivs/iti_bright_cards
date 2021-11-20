import React, {CSSProperties, ReactNode} from 'react';
import sContainer from '../../n1-main/m1-ui/common/components/Container.module.scss'

// пример универсальной таблицы
export interface ITableModel {
    title: (index: number) => ReactNode;
    render: (dataItem: any, modelIndex: number, dataIndex: number) => ReactNode;
}

interface ITableProps {
    model?: ITableModel[];
    data?: any;

    headerStyle?: CSSProperties,
    tableStyle?: CSSProperties,
    rowsStyle?: CSSProperties,
    rowStyle?: CSSProperties,
}

export const Table: React.FC<ITableProps> = (
    {
        model,
        data,
        headerStyle,
        tableStyle,
        rowsStyle,
        rowStyle,
    }
) => {

    return (
        <div
            style={{
                margin: '0 10px',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                ...tableStyle,
            }}
        >
            table
            <div
                style={{
                    border: '1px solid red',
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...headerStyle,
                }}
            >
                {/*{model.map((m: ITableModel, index: number) => m.title(index))}*/}
            </div>

            <div
                style={{
                    border: '1px solid lime',
                    width: '100%',
                    ...rowsStyle,
                }}
            >
                {data.map((dataItem: any, dataIndex: number) => (
                    <div
                        key={dataItem._id || dataIndex}
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...rowStyle,
                        }}
                    >
                        {/*{model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex))}*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

