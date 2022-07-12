namespace FunnyJokes.models
{
    public class ChuckModelClass
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public string Updated_At { get; set; }
        public string Icon_Url { get; set; }
        public string Created_At { get; set; }
        public List<string> Categories { get; set; }
        public string Value { get; set; }

    }

    public class ChuckApiReponse
    {
        public int Total { get; set; }
        public List<ChuckModelClass> Result { get; set; }
    }

}
