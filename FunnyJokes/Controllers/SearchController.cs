using FunnyJokes.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FunnyJokes.Controllers
{
    [Route("search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        string SWAPI_BASE_API_URL = "https://swapi.dev/";
        string CHUCK_BASE_API_URL = "https://api.chucknorris.io/";

        [HttpGet]
        public async Task<ActionResult> Search([FromQuery] string query)
        {
            try
            {
                SearchModelClass searchApiReponse = new SearchModelClass
                {
                    ChuckApiReponse = null,
                    SwapiApiResponse = null
                };

                if (query.Length >= 2)
                {
                    using (var httpCient = new HttpClient())
                    {
                        var response = await httpCient.GetAsync(CHUCK_BASE_API_URL + "jokes/search?query=" + query);
                        if (response.IsSuccessStatusCode)
                        {
                            searchApiReponse.ChuckApiReponse = await response.Content.ReadFromJsonAsync<ChuckApiReponse>();
                        }
                    }
                }

                using (var httpCient = new HttpClient())
                {
                    var response = await httpCient.GetAsync(SWAPI_BASE_API_URL + "api/people/?search=" + query + "&format=json");
                    if (response.IsSuccessStatusCode)
                    {
                        searchApiReponse.SwapiApiResponse = await response.Content.ReadFromJsonAsync<SwapiApiResponse>();
                        while (searchApiReponse.SwapiApiResponse.Next != null)
                        {
                            var nextResponse = await httpCient.GetAsync(searchApiReponse.SwapiApiResponse.Next);
                            if (nextResponse.IsSuccessStatusCode)
                            {
                                var nextPeople = await nextResponse.Content.ReadFromJsonAsync<SwapiApiResponse>();
                                if (nextPeople == null) break;
                                searchApiReponse.SwapiApiResponse.Next = nextPeople.Next;
                                searchApiReponse.SwapiApiResponse.results.AddRange(nextPeople.results);
                            }
                        }

                    }
                }

                return Ok(searchApiReponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }

        }
    }


}
