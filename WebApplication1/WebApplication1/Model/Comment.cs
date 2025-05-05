using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DZ10.Model
{
    public class Comment
    {
        private int _id;
        private int _postId;
        private string _name;
        private string _email;
        private string _body;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id
        {
            get => _id;
            set => _id = value;
        }
        public int postId
        {
            get => _postId;
            set => _postId = value;
        }

        public string name
        {
            get => _name;
            set => _name = value ?? throw new ArgumentNullException(nameof(value));
        }

        public string email
        {
            get => _email;
            set => _email = value ?? throw new ArgumentNullException(nameof(value));
        }

        public string body
        {
            get => _body;
            set => _body = value ?? throw new ArgumentNullException(nameof(value));
        }
    }
}
