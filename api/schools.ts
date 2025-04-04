export const fetchSchools = async (requestParams) => {
  const { startRow, endRow, sortModel } = requestParams;
  const params = new URLSearchParams();

  params.append('start', startRow);
  params.append('limit', (endRow - startRow).toString());

  if (sortModel && sortModel.length > 0) {
    params.append('sortField', sortModel[0].colId);
    params.append('sortOrder', sortModel[0].sort);
  }

  const response = await fetch(`/api/schools?${params.toString()}`);
  const data = await response.json();

  return {
    rowData: data.schools,
    rowCount: data.total
  };
};