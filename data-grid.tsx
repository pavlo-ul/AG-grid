'use client';

import type { ColDef, RowModelType } from 'ag-grid-community';
import {
  themeAlpine,
  colorSchemeDarkBlue,
  colorSchemeLightCold,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ModuleRegistry,
} from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useTheme } from 'next-themes';
import { useMemo, useRef } from 'react';

import { cn } from '@/lib/utils';

ModuleRegistry.registerModules([AllEnterpriseModule]);

interface DataGridProps<T> {
  columnDefs: ColDef<T>[];
  dataGetter?: (requestParams: IServerSideGetRowsParams['Request']) => Promise<{rowCount: number; rowData: T[] }>;
  gridOptions?: Record<string, unknown>;
  className?: string;
}

export function createServerSideDataSource<T>(dataGetter: DataGridProps<T>['dataGetter']): IServerSideDatasource {
  return {
    getRows: async (params: IServerSideGetRowsParams) => {
      const { rowData, rowCount } = await dataGetter(params.request);

      if (rowData.length) {
        params.api.hideOverlay();
      } else {
        params.api.showNoRowsOverlay();
      }

      // Return the result to the grid
      params.success({
        rowData,
        rowCount,
      });
    },
  };
}

const DataGrid = <T,>({
  columnDefs,
  dataGetter,
  gridOptions = {},
  className = '',
}: DataGridProps<T>) => {
  const gridRef = useRef<AgGridReact>(null);
  const { resolvedTheme } = useTheme();

  const updatedTheme = themeAlpine.withPart(
    resolvedTheme === 'dark' ? colorSchemeDarkBlue : colorSchemeLightCold
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      initialWidth: 130,
      width: 130,
      minWidth: 130,
      cellStyle: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      },
    }),
    []
  );

  const serverSideDataSource = useMemo(() => {
    if (dataGetter) {
      return createServerSideDataSource<T>(dataGetter);
    }

    return undefined;
  }, [dataGetter]);

  return (
    <div className={cn(`ag-theme-alpine h-full min-w-full`, className)}>
      <AgGridReact
        ref={gridRef}
        theme={updatedTheme}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows
        pagination
        rowHeight={73}
        loading={false}
        suppressHorizontalScroll={false}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 30, 40, 50]}
        maintainColumnOrder
        rowModelType={'serverSide' as RowModelType}
        serverSideDatasource={serverSideDataSource}
        {...gridOptions}
      />
    </div>
  );
};

export default DataGrid;