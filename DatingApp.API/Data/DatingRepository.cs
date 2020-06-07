using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using DatingApp.API.Models;
using System.Linq;
using DatingApp.API.helpers;
using System;

namespace DatingApp.API.Data
{
    public class DatingRepository: IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
         public void Add<T>(T entity) where T: class{
             _context.Add(entity);
         }
         public void Delete<T>(T entity) where T: class{
             _context.Remove(entity);
         }

         private async Task<IEnumerable<int>> GetUserLikes(int id, bool likes)
         {
             var user = await _context.Users
                .Include(x => x.Likers)
                .Include(x => x.Likees)
                .FirstOrDefaultAsync(u => u.Id == id);

                if(likes)
                {
                    return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
                }
                else{
                    return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
                }
         }

         public async Task<bool> SaveAll(){

             return await _context.SaveChangesAsync() > 0;

         }

         public async Task<PagedList<User>> GetUsers(UserParams userParams) {
            var users = _context.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.userId);

            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.userId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.userId, userParams.Likers);
                users= users.Where(u => userLikees.Contains(u.Id));
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var MaxAge = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOFBirth >= minDob && u.DateOFBirth <= MaxAge);
            }

            if(!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy) 
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
         
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
         }

        public async Task<User> GetUser(int id){
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<Photo> GetPhoto(int id){
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            var photo = await _context.Photos.Where(u => u.UserId == userId)
                .FirstOrDefaultAsync(p => p.IsMain);

            return photo;
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes
                .FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
        }
    }
}