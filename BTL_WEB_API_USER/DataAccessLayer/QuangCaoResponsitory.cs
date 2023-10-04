﻿using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;

namespace DataAccessLayer
{
    public partial class QuangCaoResponsitory : IQuangCaoResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public QuangCaoResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<QuangCaoModel> GetDataAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_quang_cao");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<QuangCaoModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}