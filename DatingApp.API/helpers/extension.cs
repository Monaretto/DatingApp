using Microsoft.AspNetCore.Http;
using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.helpers
{
    public static class Extension
    {
        public static void AddAplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers","ApplicatioN-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");        
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if(theDateTime.AddYears(age) > DateTime.Today)
            {
                age --;
            }

            return age;
        }

        public static void AddPagination(this HttpResponse response,
         int currentPage, int itemPerPage, int totalPages, int totalItems)
        {
            var paginationHeader = new PaginationHeader( currentPage,  itemPerPage,  totalPages,  totalItems);
            var camelCaseFormater = new JsonSerializerSettings();
            camelCaseFormater.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader,
                                                                           camelCaseFormater));
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");
            
        }
    }

    
}