'use client';

import DataGrid from '@/components/data-grid';
import { columns } from '@/views/schools-table/columns';
import { fetchSchools } from '../api/schools';

interface School {
  schoolId: string;
  name: string;
  photo: string;
  address: string;
  headmaster_name: string;
  staff_count: number;
  students_count: number;
  phone: string;
  email: string;
}

export default function SchoolsTable() {
  return (
    <div className="h-[800px] w-full">
      <h1 className="mb-4 text-2xl font-bold">Schools</h1>
      <DataGrid<School>
        columnDefs={columns}
        dataGetter={fetchSchools}
        className="rounded-md border"
        gridOptions={{
          overlayNoRowsTemplate: 'No schools found',
          overlayLoadingTemplate: 'Loading schools...'
        }}
      />
    </div>
  );
}