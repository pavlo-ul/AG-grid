'use client';

import { ColDef, ICellRendererParams } from 'ag-grid-community';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { linkRenderer } from '@/views/schools/renderers';
import EditGridRowButton from '../edit-grid-row-button';

export const columns: ColDef[] = [
  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    cellRenderer: (params: ICellRendererParams) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={params.data.photo} alt={params.data.name} />
              <AvatarFallback className="text-black">{params.data.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {linkRenderer(params.data.name, `/batch/school/${params.data.schoolId}/edit`)}
          </div>
        </div>
      );
    },
  },
  {
    headerName: 'Location',
    field: 'address',
    sortable: true,
    valueGetter: (params => params.data.address || 'N/A'),
  },
  {
    headerName: 'Headmaster',
    field: 'headmaster_name',
    sortable: true,
    valueGetter: (params => params.data.headmaster_name || 'N/A'),
  },
  {
    headerName: 'Staff Count',
    field: 'staff_count',
    sortable: true,
  },
  {
    headerName: 'Students Count',
    field: 'students_count',
    sortable: true,
  },
  {
    headerName: 'Phone',
    field: 'phone',
    sortable: true,
    valueGetter: (params => params.data.phone || 'N/A'),
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    valueGetter: (params => params.data.email || 'N/A'),
  },
  {
    headerName: 'Actions',
    field: 'actions',
    cellRenderer: (params: ICellRendererParams) => {
      return (
        <EditGridRowButton href={`/batch/school/${params.data.schoolId}/edit`} />
      );
    },
  },
];