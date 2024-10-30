namespace Backend.Dtos
{
    public class CustomerUpdateDto
    {
        public int cid { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

        public string company { get; set; }

        public string position { get; set; }

        public string address { get; set; }
    }
}
