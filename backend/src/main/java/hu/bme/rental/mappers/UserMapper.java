package hu.bme.rental.mappers;

import hu.bme.rental.api.model.User;
import hu.bme.rental.api.model.UserRequest;
import hu.bme.rental.persistence.models.AppUser;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        unmappedSourcePolicy = ReportingPolicy.IGNORE,
        uses = {
                BalanceMapper.class,
                UniversityMapper.class,
                FacultyMapper.class
        }
)
public interface UserMapper {

    /**
     * Maps a persistence model to an API model
     * @param appUser Persistence model user
     * @return API model user
     */
    @Mapping(source = "balance", target = "balance", qualifiedByName = "toApiDto")
    @Mapping(source = "university", target = "university", qualifiedByName = "toApiDto")
    @Mapping(source = "faculty", target = "faculty", qualifiedByName = "toApiDto")
    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(target = "loginType", ignore = true)
    User appUserToUser(AppUser appUser);


    /**
     * Maps a list of persistence model users to API model users
     * @param appUsers List of persistence model users
     * @return List of API model users
     */
    List<User> appUsersToUsers(List<AppUser> appUsers);



    /**
     * Updates an existing AppUser with data from UserRequest
     * @param userRequest The source UserRequest with updated fields
     * @param appUser The target AppUser to update
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(source = "balance", target = "balance", qualifiedByName = "toEntity")
    @Mapping(source = "university", target = "university", qualifiedByName = "toEntity")
    @Mapping(source = "faculty", target = "faculty", qualifiedByName = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateAppUserFromUserRequest(UserRequest userRequest, @MappingTarget AppUser appUser);



}
