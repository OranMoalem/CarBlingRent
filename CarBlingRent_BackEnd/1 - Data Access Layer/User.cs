using System;
using System.Collections.Generic;
#nullable disable

namespace CarBlingRent
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public int UserId { get; set; }
        public string UserFullName { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public DateTime? UserIdateOfBirth { get; set; }
        public string UserGender { get; set; }
        public string UserEmail { get; set; }
        public string UserIpassword { get; set; }
        public string UserImage { get; set; }
        public string UserPermission { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
