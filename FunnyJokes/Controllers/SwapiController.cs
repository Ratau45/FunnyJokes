using FunnyJokes.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FunnyJokes.Controllers
{

    [Route("swapi")]
    [ApiController]
    public class SwapiController : ControllerBase
    {
        string BASE_API_URL = "https://swapi.dev/";


        ///<summary>
        ///Get all star wars people
        ///</summary>
        ///<returns>a list of people from star wars</returns>
        ///<reponse code="200"> Returns all the star wars people list </reponse>
        ///<response code="500">internal error</response>

        /* INSTRUCTIONS: IT WAS SPECIFIED THAT ENDPOINT SHOULD BE "/SWAPI/PEOPLE". HENCE HOUR ROOT PATH IS "SWAPI",
            SPECIFIES THE ENDPOINT TO HAVE THE ROUTE "PEOPLE" TO
           BE APPENDED TO THE ROOT PATH EQUALING TO AN ENDPONT OF "HHTPS://https://localhost:7272/swapi/people"
        */

        [HttpGet]

        public async Task<ActionResult> GetPeople()
        {
            try
            {


                SwapiApiResponse? People = null;

                using (var httpClient = new HttpClient())
                {
                    var response = await httpClient.GetAsync(BASE_API_URL + "api/people");
                    if (response.IsSuccessStatusCode)
                    {
                       
            
                        People = await response.Content.ReadFromJsonAsync<SwapiApiResponse>();
                   
                    }
                }
                return Ok(People.results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);

            }

        }
    }
}
