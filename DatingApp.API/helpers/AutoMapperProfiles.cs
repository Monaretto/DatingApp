using AutoMapper;
using DatingApp.API.DTOS;
using DatingApp.API.Models;
using System.Linq;


namespace DatingApp.API.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt => 
            opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOFBirth.CalculateAge()));
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => 
            opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOFBirth.CalculateAge()));;
            CreateMap<Photo, PhotoForDetailedDTO>();

            CreateMap<UserForUpdateDTO, User>();
            CreateMap<Photo, PhotoForReturnDTO>();
            CreateMap<PhotoForCreationDTO,Photo>();
        }
    }
}