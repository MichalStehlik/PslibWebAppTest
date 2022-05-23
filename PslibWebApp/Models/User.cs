using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PslibWebApp.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; } = String.Empty;
        public string MiddleName { get; set; } = String.Empty;
        [Required]
        public string LastName { get; set; } = String.Empty;
        [Required]
        public Gender Gender { get; set; }
        [Required]
        public string Email { get; set; } = String.Empty;
        public long? Phone { get; set; }
        public Guid? IdentityId { get; set; }
        public byte[]? IconImage { get; set; }
        public string? IconImageType { get; set; }
        public DateTime? AuthorizedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        [NotMapped]
        public string Name { get { return LastName + ", " + FirstName + (String.IsNullOrEmpty(MiddleName) ? "" : (" " + MiddleName)); } }
    }
}
