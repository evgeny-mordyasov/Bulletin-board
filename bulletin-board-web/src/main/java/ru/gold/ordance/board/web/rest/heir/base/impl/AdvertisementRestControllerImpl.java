package ru.gold.ordance.board.web.rest.heir.base.impl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.gold.ordance.board.web.api.photo.PhotoSaveRq;
import ru.gold.ordance.board.web.api.photo.PhotoSaveRs;
import ru.gold.ordance.board.web.rest.heir.base.AdvertisementRestController;
import ru.gold.ordance.board.web.api.Status;
import ru.gold.ordance.board.web.api.advertisement.*;
import ru.gold.ordance.board.web.service.base.AdvertisementWebService;
import ru.gold.ordance.board.web.service.base.PhotoWebService;

import static ru.gold.ordance.board.web.swagger.example.ApiExamples.ApiAdvertisement.*;
import static ru.gold.ordance.board.web.swagger.example.ApiExamples.Common.*;
import static ru.gold.ordance.board.web.utils.RequestUtils.*;
import static ru.gold.ordance.board.web.validation.Validation.validate;

@RestController
@RequestMapping(value = "/api/v1/advertisements")
@CrossOrigin(origins = "${cross-origin}")
public class AdvertisementRestControllerImpl {
    private static final Logger LOGGER = LoggerFactory.getLogger(AdvertisementRestControllerImpl.class);

    private final AdvertisementWebService service;
    private final PhotoWebService photoWebService;

    public AdvertisementRestControllerImpl(AdvertisementWebService service,
                                           PhotoWebService photoWebService) {
        this.service = service;
        this.photoWebService = photoWebService;
    }

    @GetMapping(produces = JSON)
    @Operation(summary = "Get all advertisements", tags = "search")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request. Size of the list is {0, ..., n}.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_SUCCESS))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_CALL_ERROR)))
    })
    public AdvertisementGetRs findAll() {
        try {
            LOGGER.info("Get all received.");

            AdvertisementGetRs rs = service.findAll();
            handleResponse(LOGGER, rs, null, null);

            return rs;
        } catch (Exception e) {
            Status status = toStatus(e);
            AdvertisementGetRs rs = AdvertisementGetRs.error(status.getCode(), status.getDescription());
            handleResponse(LOGGER, rs, null, e);

            return rs;
        }
    }

    @GetMapping(value = "/{entityId}", produces = JSON)
    @Operation(summary = "Get advertisement by id", tags = "search")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request. Size of the list is {0 or 1}.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_SUCCESS))),

            @ApiResponse(responseCode = "INVALID_RQ",
                    description = "Invalid request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_INVALID_RQ))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_CALL_ERROR)))
    })
    public WebAdvertisementGetById findById(@PathVariable Long entityId) {
        AdvertisementGetByIdRq rq = new AdvertisementGetByIdRq(entityId);

        try {
            LOGGER.info("Get by id request received: {}", rq);

            validate(rq);
            WebAdvertisementGetById rs = service.findById(rq);
            handleResponse(LOGGER, rs, rq, null);

            return rs;
        } catch (Exception e) {
            Status status = toStatus(e);
            WebAdvertisementGetById rs = WebAdvertisementGetById.error(status.getCode(), status.getDescription());
            handleResponse(LOGGER, rs, rq, e);

            return rs;
        }
    }

    @GetMapping(value = "/category-name/{name}", produces = JSON)
    @Operation(summary = "Get advertisement by category name", tags = "search")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request. Size of the list is {0, ..., n}.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_SUCCESS))),

            @ApiResponse(responseCode = "INVALID_RQ",
                    description = "Invalid request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_INVALID_RQ))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_CALL_ERROR)))
    })
    public AdvertisementGetRs findByCategoryName(@PathVariable String name) {
        AdvertisementGetByCategoryNameRq rq = new AdvertisementGetByCategoryNameRq(name);

        try {
            LOGGER.info("Get by category name request received: {}", rq);

            validate(rq);
            AdvertisementGetRs rs = service.findByCategoryName(rq);
            handleResponse(LOGGER, rs, rq, null);

            return rs;
        } catch (Exception e) {
            Status status = toStatus(e);
            AdvertisementGetRs rs = AdvertisementGetRs.error(status.getCode(), status.getDescription());
            handleResponse(LOGGER, rs, rq, e);

            return rs;
        }
    }

    @GetMapping(value = "/region-name/{name}", produces = JSON)
    @Operation(summary = "Get advertisement by region name", tags = "search")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request. Size of the list is {0, ..., n}.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_SUCCESS))),

            @ApiResponse(responseCode = "INVALID_RQ",
                    description = "Invalid request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_INVALID_RQ))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_CALL_ERROR)))
    })
    public AdvertisementGetRs findByRegionName(@PathVariable String name) {
        AdvertisementGetByRegionNameRq rq = new AdvertisementGetByRegionNameRq(name);

        try {
            LOGGER.info("Get by region name request received: {}", rq);

            validate(rq);
            AdvertisementGetRs rs = service.findByRegionName(rq);
            handleResponse(LOGGER, rs, rq, null);

            return rs;
        } catch (Exception e) {
            Status status = toStatus(e);
            AdvertisementGetRs rs = AdvertisementGetRs.error(status.getCode(), status.getDescription());
            handleResponse(LOGGER, rs, rq, e);

            return rs;
        }
    }

    @GetMapping(value = "/category-name/{categoryName}/region-name/{regionName}", produces = JSON)
    @Operation(summary = "Get advertisement by region name", tags = "search")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request. Size of the list is {0, ..., n}.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_SUCCESS))),

            @ApiResponse(responseCode = "INVALID_RQ",
                    description = "Invalid request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_INVALID_RQ))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_CALL_ERROR)))
    })
    public AdvertisementGetRs findByCategoryNameAndRegionName(@PathVariable String categoryName, @PathVariable String regionName) {
        AdvertisementGetByCategoryNameAndRegionNameRq rq =
                new AdvertisementGetByCategoryNameAndRegionNameRq(categoryName, regionName);

        try {
            LOGGER.info("Get by category name and region name request received: {}", rq);

            validate(rq);
            AdvertisementGetRs rs = service.findByCategoryNameAndRegionName(rq);
            handleResponse(LOGGER, rs, rq, null);

            return rs;
        } catch (Exception e) {
            Status status = toStatus(e);
            AdvertisementGetRs rs = AdvertisementGetRs.error(status.getCode(), status.getDescription());
            handleResponse(LOGGER, rs, rq, e);

            return rs;
        }
    }

    @GetMapping(value = "/name/{name}", produces = JSON)
    @Operation(summary = "Get advertisement by name", tags = "search")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request. Size of the list is {0, ..., n}.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_SUCCESS))),

            @ApiResponse(responseCode = "INVALID_RQ",
                    description = "Invalid request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_INVALID_RQ))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(FIND_CALL_ERROR)))
    })
    public AdvertisementGetRs findByName(@PathVariable String name) {
        AdvertisementGetByNameRq rq = new AdvertisementGetByNameRq(name);

        try {
            LOGGER.info("Get by name request received: {}", rq);

            validate(rq);
            AdvertisementGetRs rs = service.findByName(rq);
            handleResponse(LOGGER, rs, rq, null);

            return rs;
        } catch (Exception e) {
            Status status = toStatus(e);
            AdvertisementGetRs rs = AdvertisementGetRs.error(status.getCode(), status.getDescription());
            handleResponse(LOGGER, rs, rq, e);

            return rs;
        }
    }

    @PostMapping()
    @Operation(summary = "(Save OR update) advertisement", tags = "save")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(UPDATE_SUCCESS))),

            @ApiResponse(responseCode = "INVALID_RQ",
                    description = "Invalid request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(UPDATE_INVALID_RQ))),

            @ApiResponse(responseCode = "VIOLATES_CONSTRAINT",
                    description = CONSTRAINT_MESSAGE,
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(UPDATE_VIOLATES_CONSTRAINT))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(UPDATE_CALL_ERROR)))
    })
    public AdvertisementUpdateRs update(
            @RequestParam("entityId") Long entityId,
            @RequestParam("clientId") Long clientId,
            @RequestParam("name") String name,
            @RequestParam("subcategoryId") Long subcategoryId,
            @RequestParam("description") String description,
            @RequestParam("localityId") Long localityId,
            @RequestParam("price") int price,
            @RequestParam("streetId") Long streetId,
            @RequestParam("houseNumber") String houseNumber,
            @RequestParam("file") MultipartFile file
    ) {

        try {
            PhotoSaveRq photoRq = new PhotoSaveRq(file);
            PhotoSaveRs rs = photoWebService.save(photoRq);

            AdvertisementUpdateRq rq = new AdvertisementUpdateRq(
                    entityId,
                    clientId,
                    name,
                    subcategoryId,
                    description,
                    price,
                    localityId,
                    streetId,
                    houseNumber,
                    rs.getEntityId()
            );

            validate(rq);
            AdvertisementUpdateRs rsAd = service.update(rq);
            handleResponse(LOGGER, rsAd, rq, null);

            return rsAd;
        } catch (Exception e) {
            Status status = toStatus(e);

            return AdvertisementUpdateRs.error(status.getCode(), status.getDescription());
        }
    }

    @DeleteMapping(value = "/{entityId}", produces = JSON)
    @Operation(summary = "Delete advertisement by id", tags = "delete")
    @ApiResponses({
            @ApiResponse(responseCode = "SUCCESS",
                    description = "Success request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(DELETE_SUCCESS))),

            @ApiResponse(responseCode = "INVALID_RQ",
                    description = "Invalid request.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(DELETE_INVALID_RQ))),

            @ApiResponse(responseCode = "CALL_ERROR",
                    description = "Internal Server Error.",
                    content = @Content(mediaType = JSON,
                            examples = @ExampleObject(DELETE_CALL_ERROR)))
    })
    public AdvertisementDeleteByIdRs deleteById(@PathVariable Long entityId) {
        AdvertisementDeleteByIdRq rq = new AdvertisementDeleteByIdRq(entityId);

        try {
            LOGGER.info("Delete request received: {}", rq);

            validate(rq);
            AdvertisementDeleteByIdRs rs = service.deleteById(rq);
            handleResponse(LOGGER, rs, rq, null);

            return rs;
        } catch (Exception e) {
            Status status = toStatus(e);
            AdvertisementDeleteByIdRs rs = AdvertisementDeleteByIdRs.error(status.getCode(), status.getDescription());
            handleResponse(LOGGER, rs, rq, e);

            return rs;
        }
    }
}
