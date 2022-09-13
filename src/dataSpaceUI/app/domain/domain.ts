/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.16.538 on 2022-09-09 15:13:56.

export namespace eu.intelcomp.xsd2java {

    export class Affiliation implements java.io.Serializable {
        value: string;
        affiliationIdentifier: string;
        affiliationIdentifierScheme: string;
        schemeURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Box implements java.io.Serializable {
        westBoundLongitude: number;
        eastBoundLongitude: number;
        southBoundLatitude: number;
        northBoundLatitude: number;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetInstance implements java.io.Serializable {
        id: string;
        type: string;
        metadata: eu.intelcomp.xsd2java.MetadataType;
        location: eu.intelcomp.xsd2java.DatasetInstance$Location;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetInstance$Location implements java.io.Serializable {
        files: eu.intelcomp.xsd2java.DatasetInstance$Location$Files;
        database: eu.intelcomp.xsd2java.DatasetInstance$Location$Database;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetInstance$Location$Database implements java.io.Serializable {
        type: string;
        connectionUrl: string;
        schema: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetInstance$Location$Files implements java.io.Serializable {
        baseDir: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType implements java.io.Serializable {
        id: string;
        identifier: eu.intelcomp.xsd2java.DatasetType$Identifier;
        name: string;
        metadata: eu.intelcomp.xsd2java.DatasetType$Metadata;
        schema: eu.intelcomp.xsd2java.DatasetType$Schema;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Identifier implements java.io.Serializable {
        value: string;
        identifierType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata implements java.io.Serializable {
        titles: eu.intelcomp.xsd2java.DatasetType$Metadata$Title[];
        publisher: string;
        subjects: string[];
        languages: string[];
        type: eu.intelcomp.xsd2java.DatasetType$Metadata$Type;
        alternateIdentifiers: eu.intelcomp.xsd2java.DatasetType$Metadata$AlternateIdentifier[];
        relatedIdentifiers: eu.intelcomp.xsd2java.DatasetType$Metadata$RelatedIdentifier[];
        formats: string[];
        rightsList: eu.intelcomp.xsd2java.DatasetType$Metadata$Rights[];
        descriptions: eu.intelcomp.xsd2java.DatasetType$Metadata$Description[];
        geoLocations: eu.intelcomp.xsd2java.DatasetType$Metadata$GeoLocation[];
        typology: string;
        domain: string;
        source: string;
        tags: string[];
        contact: eu.intelcomp.xsd2java.DatasetType$Metadata$Contact;
        webpage: string;
        logo: string;
        provenance: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$AlternateIdentifier implements java.io.Serializable {
        value: string;
        alternateIdentifierType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$Contact implements java.io.Serializable {
        name: string;
        email: string;
        phone: string;
        position: string;
        organization: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$Description implements java.io.Serializable {
        value: string;
        descriptionType: eu.intelcomp.xsd2java.DescriptionType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$GeoLocation implements java.io.Serializable {
        geoLocationPoint: eu.intelcomp.xsd2java.Point;
        geoLocationBox: eu.intelcomp.xsd2java.Box;
        geoLocationPlace: any;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$RelatedIdentifier implements java.io.Serializable {
        value: string;
        relatedIdentifierType: eu.intelcomp.xsd2java.RelatedIdentifierType;
        relationType: eu.intelcomp.xsd2java.RelationType;
        relatedMetadataScheme: string;
        schemeURI: string;
        schemeType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$Rights implements java.io.Serializable {
        value: string;
        rightsURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$Title implements java.io.Serializable {
        value: string;
        titleType: eu.intelcomp.xsd2java.TitleType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Metadata$Type implements java.io.Serializable {
        value: string;
        clazz: eu.intelcomp.xsd2java.ResourceType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Schema implements java.io.Serializable {
        type: eu.intelcomp.xsd2java.SchemaType;
        entities: eu.intelcomp.xsd2java.DatasetType$Schema$Entity[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Schema$Entity implements java.io.Serializable {
        name: string;
        description: string;
        filters: eu.intelcomp.xsd2java.DatasetType$Schema$Entity$Filter[];
        sample: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class DatasetType$Schema$Entity$Filter implements java.io.Serializable {
        field: string;
        type: string;
        repeated: boolean;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class MetadataType implements java.io.Serializable {
        version: string;
        identifier: eu.intelcomp.xsd2java.MetadataType$Identifier;
        creators: eu.intelcomp.xsd2java.MetadataType$Creator[];
        contributors: eu.intelcomp.xsd2java.MetadataType$Contributor[];
        dates: eu.intelcomp.xsd2java.MetadataType$Date[];
        sizes: string[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class MetadataType$Contributor implements java.io.Serializable {
        contributorName: string;
        nameIdentifier: eu.intelcomp.xsd2java.MetadataType$Contributor$NameIdentifier;
        affiliations: any[];
        contributorType: eu.intelcomp.xsd2java.ContributorType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class MetadataType$Contributor$NameIdentifier implements java.io.Serializable {
        value: string;
        nameIdentifierScheme: string;
        schemeURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class MetadataType$Creator implements java.io.Serializable {
        creatorName: string;
        nameIdentifier: eu.intelcomp.xsd2java.MetadataType$Creator$NameIdentifier;
        affiliations: any[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class MetadataType$Creator$NameIdentifier implements java.io.Serializable {
        value: string;
        nameIdentifierScheme: string;
        schemeURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class MetadataType$Date implements java.io.Serializable {
        value: string;
        dateType: eu.intelcomp.xsd2java.DateType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class MetadataType$Identifier implements java.io.Serializable {
        value: string;
        identifierType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model implements java.io.Serializable {
        identifier: eu.intelcomp.xsd2java.Model$Identifier;
        creators: eu.intelcomp.xsd2java.Model$Creator[];
        titles: eu.intelcomp.xsd2java.Model$Title[];
        publisher: eu.intelcomp.xsd2java.Model$Publisher;
        publicationYear: string;
        resourceType: eu.intelcomp.xsd2java.Model$ResourceType;
        subjects: eu.intelcomp.xsd2java.Model$Subject[];
        contributors: eu.intelcomp.xsd2java.Model$Contributor[];
        dates: eu.intelcomp.xsd2java.Model$Date[];
        language: string;
        alternateIdentifiers: eu.intelcomp.xsd2java.Model$AlternateIdentifier[];
        relatedIdentifiers: eu.intelcomp.xsd2java.Model$RelatedIdentifier[];
        sizes: string[];
        formats: string[];
        version: string;
        rightsList: eu.intelcomp.xsd2java.Model$Rights[];
        descriptions: eu.intelcomp.xsd2java.Model$Description[];
        geoLocations: eu.intelcomp.xsd2java.Model$GeoLocation[];
        fundingReferences: eu.intelcomp.xsd2java.Model$FundingReference[];
        relatedItems: eu.intelcomp.xsd2java.Model$RelatedItem[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$AlternateIdentifier implements java.io.Serializable {
        value: string;
        alternateIdentifierType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Contributor implements java.io.Serializable {
        contributorName: eu.intelcomp.xsd2java.Model$Contributor$ContributorName;
        givenName: string;
        familyName: string;
        nameIdentifiers: any[];
        affiliations: any[];
        contributorType: eu.intelcomp.xsd2java.ContributorType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Contributor$ContributorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Creator implements java.io.Serializable {
        creatorName: eu.intelcomp.xsd2java.Model$Creator$CreatorName;
        givenName: string;
        familyName: string;
        nameIdentifiers: any[];
        affiliations: any[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Creator$CreatorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Date implements java.io.Serializable {
        value: string;
        dateType: eu.intelcomp.xsd2java.DateType;
        dateInformation: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Description implements java.io.Serializable {
        content: java.io.Serializable[];
        descriptionType: eu.intelcomp.xsd2java.DescriptionType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Description$Br implements java.io.Serializable {
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$FundingReference implements java.io.Serializable {
        funderName: string;
        funderIdentifier: eu.intelcomp.xsd2java.Model$FundingReference$FunderIdentifier;
        awardNumber: eu.intelcomp.xsd2java.Model$FundingReference$AwardNumber;
        awardTitle: any;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$FundingReference$AwardNumber implements java.io.Serializable {
        value: string;
        awardURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$FundingReference$FunderIdentifier implements java.io.Serializable {
        value: string;
        funderIdentifierType: eu.intelcomp.xsd2java.FunderIdentifierType;
        schemeURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$GeoLocation implements java.io.Serializable {
        geoLocationPlacesAndGeoLocationPointsAndGeoLocationBoxes: any[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$GeoLocation$GeoLocationPolygon implements java.io.Serializable {
        polygonPoints: eu.intelcomp.xsd2java.Point[];
        inPolygonPoint: eu.intelcomp.xsd2java.Point;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Identifier implements java.io.Serializable {
        value: string;
        identifierType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Publisher implements java.io.Serializable {
        value: string;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedIdentifier implements java.io.Serializable {
        value: string;
        resourceTypeGeneral: eu.intelcomp.xsd2java.ResourceType;
        relatedIdentifierType: eu.intelcomp.xsd2java.RelatedIdentifierType;
        relationType: eu.intelcomp.xsd2java.RelationType;
        relatedMetadataScheme: string;
        schemeURI: string;
        schemeType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem implements java.io.Serializable {
        relatedItemIdentifier: eu.intelcomp.xsd2java.Model$RelatedItem$RelatedItemIdentifier;
        creators: eu.intelcomp.xsd2java.Model$RelatedItem$Creator[];
        titles: eu.intelcomp.xsd2java.Model$RelatedItem$Title[];
        publicationYear: string;
        volume: any;
        issue: any;
        number: eu.intelcomp.xsd2java.Model$RelatedItem$Number;
        firstPage: any;
        lastPage: any;
        publisher: any;
        edition: any;
        contributors: eu.intelcomp.xsd2java.Model$RelatedItem$Contributor[];
        relatedItemType: eu.intelcomp.xsd2java.ResourceType;
        relationType: eu.intelcomp.xsd2java.RelationType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem$Contributor implements java.io.Serializable {
        contributorName: eu.intelcomp.xsd2java.Model$RelatedItem$Contributor$ContributorName;
        givenName: string;
        familyName: string;
        contributorType: eu.intelcomp.xsd2java.ContributorType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem$Contributor$ContributorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem$Creator implements java.io.Serializable {
        creatorName: eu.intelcomp.xsd2java.Model$RelatedItem$Creator$CreatorName;
        givenName: string;
        familyName: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem$Creator$CreatorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem$Number implements java.io.Serializable {
        value: string;
        numberType: eu.intelcomp.xsd2java.NumberType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem$RelatedItemIdentifier implements java.io.Serializable {
        value: string;
        relatedItemIdentifierType: eu.intelcomp.xsd2java.RelatedIdentifierType;
        relatedMetadataScheme: string;
        schemeURI: string;
        schemeType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$RelatedItem$Title implements java.io.Serializable {
        value: string;
        titleType: eu.intelcomp.xsd2java.TitleType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$ResourceType implements java.io.Serializable {
        value: string;
        resourceTypeGeneral: eu.intelcomp.xsd2java.ResourceType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Rights implements java.io.Serializable {
        value: string;
        rightsURI: string;
        rightsIdentifier: string;
        rightsIdentifierScheme: string;
        schemeURI: string;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Subject implements java.io.Serializable {
        value: string;
        subjectScheme: string;
        schemeURI: string;
        valueURI: string;
        classificationCode: string;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Model$Title implements java.io.Serializable {
        value: string;
        titleType: eu.intelcomp.xsd2java.TitleType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class NameIdentifier implements java.io.Serializable {
        value: string;
        nameIdentifierScheme: string;
        schemeURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class ObjectFactory {
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Point implements java.io.Serializable {
        pointLongitude: number;
        pointLatitude: number;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool implements java.io.Serializable {
        identifier: eu.intelcomp.xsd2java.Tool$Identifier;
        creators: eu.intelcomp.xsd2java.Tool$Creator[];
        titles: eu.intelcomp.xsd2java.Tool$Title[];
        publisher: eu.intelcomp.xsd2java.Tool$Publisher;
        publicationYear: string;
        resourceType: eu.intelcomp.xsd2java.Tool$ResourceType;
        subjects: eu.intelcomp.xsd2java.Tool$Subject[];
        contributors: eu.intelcomp.xsd2java.Tool$Contributor[];
        dates: eu.intelcomp.xsd2java.Tool$Date[];
        language: string;
        alternateIdentifiers: eu.intelcomp.xsd2java.Tool$AlternateIdentifier[];
        relatedIdentifiers: eu.intelcomp.xsd2java.Tool$RelatedIdentifier[];
        sizes: string[];
        formats: string[];
        version: string;
        rightsList: eu.intelcomp.xsd2java.Tool$Rights[];
        descriptions: eu.intelcomp.xsd2java.Tool$Description[];
        geoLocations: eu.intelcomp.xsd2java.Tool$GeoLocation[];
        fundingReferences: eu.intelcomp.xsd2java.Tool$FundingReference[];
        relatedItems: eu.intelcomp.xsd2java.Tool$RelatedItem[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$AlternateIdentifier implements java.io.Serializable {
        value: string;
        alternateIdentifierType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Contributor implements java.io.Serializable {
        contributorName: eu.intelcomp.xsd2java.Tool$Contributor$ContributorName;
        givenName: string;
        familyName: string;
        nameIdentifiers: any[];
        affiliations: any[];
        contributorType: eu.intelcomp.xsd2java.ContributorType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Contributor$ContributorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Creator implements java.io.Serializable {
        creatorName: eu.intelcomp.xsd2java.Tool$Creator$CreatorName;
        givenName: string;
        familyName: string;
        nameIdentifiers: any[];
        affiliations: any[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Creator$CreatorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Date implements java.io.Serializable {
        value: string;
        dateType: eu.intelcomp.xsd2java.DateType;
        dateInformation: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Description implements java.io.Serializable {
        content: java.io.Serializable[];
        descriptionType: eu.intelcomp.xsd2java.DescriptionType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Description$Br implements java.io.Serializable {
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$FundingReference implements java.io.Serializable {
        funderName: string;
        funderIdentifier: eu.intelcomp.xsd2java.Tool$FundingReference$FunderIdentifier;
        awardNumber: eu.intelcomp.xsd2java.Tool$FundingReference$AwardNumber;
        awardTitle: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$FundingReference$AwardNumber implements java.io.Serializable {
        value: string;
        awardURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$FundingReference$FunderIdentifier implements java.io.Serializable {
        value: string;
        funderIdentifierType: eu.intelcomp.xsd2java.FunderIdentifierType;
        schemeURI: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$GeoLocation implements java.io.Serializable {
        geoLocationPlacesAndGeoLocationPointsAndGeoLocationBoxes: any[];
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$GeoLocation$GeoLocationPolygon implements java.io.Serializable {
        polygonPoints: eu.intelcomp.xsd2java.Point[];
        inPolygonPoint: eu.intelcomp.xsd2java.Point;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Identifier implements java.io.Serializable {
        value: string;
        identifierType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Publisher implements java.io.Serializable {
        value: string;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedIdentifier implements java.io.Serializable {
        value: string;
        resourceTypeGeneral: eu.intelcomp.xsd2java.ResourceType;
        relatedIdentifierType: eu.intelcomp.xsd2java.RelatedIdentifierType;
        relationType: eu.intelcomp.xsd2java.RelationType;
        relatedMetadataScheme: string;
        schemeURI: string;
        schemeType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem implements java.io.Serializable {
        relatedItemIdentifier: eu.intelcomp.xsd2java.Tool$RelatedItem$RelatedItemIdentifier;
        creators: eu.intelcomp.xsd2java.Tool$RelatedItem$Creator[];
        titles: eu.intelcomp.xsd2java.Tool$RelatedItem$Title[];
        publicationYear: string;
        volume: string;
        issue: string;
        number: eu.intelcomp.xsd2java.Tool$RelatedItem$Number;
        firstPage: string;
        lastPage: string;
        publisher: string;
        edition: string;
        contributors: eu.intelcomp.xsd2java.Tool$RelatedItem$Contributor[];
        relatedItemType: eu.intelcomp.xsd2java.ResourceType;
        relationType: eu.intelcomp.xsd2java.RelationType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem$Contributor implements java.io.Serializable {
        contributorName: eu.intelcomp.xsd2java.Tool$RelatedItem$Contributor$ContributorName;
        givenName: string;
        familyName: string;
        contributorType: eu.intelcomp.xsd2java.ContributorType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem$Contributor$ContributorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem$Creator implements java.io.Serializable {
        creatorName: eu.intelcomp.xsd2java.Tool$RelatedItem$Creator$CreatorName;
        givenName: string;
        familyName: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem$Creator$CreatorName implements java.io.Serializable {
        value: string;
        nameType: eu.intelcomp.xsd2java.NameType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem$Number implements java.io.Serializable {
        value: string;
        numberType: eu.intelcomp.xsd2java.NumberType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem$RelatedItemIdentifier implements java.io.Serializable {
        value: string;
        relatedItemIdentifierType: eu.intelcomp.xsd2java.RelatedIdentifierType;
        relatedMetadataScheme: string;
        schemeURI: string;
        schemeType: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$RelatedItem$Title implements java.io.Serializable {
        value: string;
        titleType: eu.intelcomp.xsd2java.TitleType;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$ResourceType implements java.io.Serializable {
        value: string;
        resourceTypeGeneral: eu.intelcomp.xsd2java.ResourceType;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Rights implements java.io.Serializable {
        value: string;
        rightsURI: string;
        rightsIdentifier: string;
        rightsIdentifierScheme: string;
        schemeURI: string;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Subject implements java.io.Serializable {
        value: string;
        subjectScheme: string;
        schemeURI: string;
        valueURI: string;
        classificationCode: string;
        lang: string;
    }

}

export namespace eu.intelcomp.xsd2java {

    export class Tool$Title implements java.io.Serializable {
        value: string;
        titleType: eu.intelcomp.xsd2java.TitleType;
        lang: string;
    }

}

export namespace java.io {

    export interface Serializable {
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum ContributorType {
        CONTACT_PERSON = "CONTACT_PERSON",
        DATA_COLLECTOR = "DATA_COLLECTOR",
        DATA_CURATOR = "DATA_CURATOR",
        DATA_MANAGER = "DATA_MANAGER",
        DISTRIBUTOR = "DISTRIBUTOR",
        EDITOR = "EDITOR",
        FUNDER = "FUNDER",
        HOSTING_INSTITUTION = "HOSTING_INSTITUTION",
        OTHER = "OTHER",
        PRODUCER = "PRODUCER",
        PROJECT_LEADER = "PROJECT_LEADER",
        PROJECT_MANAGER = "PROJECT_MANAGER",
        PROJECT_MEMBER = "PROJECT_MEMBER",
        REGISTRATION_AGENCY = "REGISTRATION_AGENCY",
        REGISTRATION_AUTHORITY = "REGISTRATION_AUTHORITY",
        RELATED_PERSON = "RELATED_PERSON",
        RESEARCH_GROUP = "RESEARCH_GROUP",
        RIGHTS_HOLDER = "RIGHTS_HOLDER",
        RESEARCHER = "RESEARCHER",
        SPONSOR = "SPONSOR",
        SUPERVISOR = "SUPERVISOR",
        WORK_PACKAGE_LEADER = "WORK_PACKAGE_LEADER",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum DateType {
        ACCEPTED = "ACCEPTED",
        AVAILABLE = "AVAILABLE",
        COLLECTED = "COLLECTED",
        COPYRIGHTED = "COPYRIGHTED",
        CREATED = "CREATED",
        ISSUED = "ISSUED",
        SUBMITTED = "SUBMITTED",
        UPDATED = "UPDATED",
        VALID = "VALID",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum DescriptionType {
        ABSTRACT = "ABSTRACT",
        METHODS = "METHODS",
        SERIES_INFORMATION = "SERIES_INFORMATION",
        TABLE_OF_CONTENTS = "TABLE_OF_CONTENTS",
        OTHER = "OTHER",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum FunderIdentifierType {
        ISNI = "ISNI",
        GRID = "GRID",
        ROR = "ROR",
        CROSSREF_FUNDER_ID = "CROSSREF_FUNDER_ID",
        OTHER = "OTHER",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum NameType {
        ORGANIZATIONAL = "ORGANIZATIONAL",
        PERSONAL = "PERSONAL",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum NumberType {
        ARTICLE = "ARTICLE",
        CHAPTER = "CHAPTER",
        REPORT = "REPORT",
        OTHER = "OTHER",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum RelatedIdentifierType {
        ARK = "ARK",
        AR_XIV = "AR_XIV",
        BIBCODE = "BIBCODE",
        DOI = "DOI",
        EAN_13 = "EAN_13",
        EISSN = "EISSN",
        HANDLE = "HANDLE",
        ISBN = "ISBN",
        ISSN = "ISSN",
        ISTC = "ISTC",
        LISSN = "LISSN",
        LSID = "LSID",
        PMID = "PMID",
        PURL = "PURL",
        UPC = "UPC",
        URL = "URL",
        URN = "URN",
        INTERNAL = "INTERNAL",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum RelationType {
        IS_CITED_BY = "IS_CITED_BY",
        CITES = "CITES",
        IS_SUPPLEMENT_TO = "IS_SUPPLEMENT_TO",
        IS_SUPPLEMENTED_BY = "IS_SUPPLEMENTED_BY",
        IS_CONTINUED_BY = "IS_CONTINUED_BY",
        CONTINUES = "CONTINUES",
        IS_NEW_VERSION_OF = "IS_NEW_VERSION_OF",
        IS_PREVIOUS_VERSION_OF = "IS_PREVIOUS_VERSION_OF",
        IS_PART_OF = "IS_PART_OF",
        HAS_PART = "HAS_PART",
        IS_REFERENCED_BY = "IS_REFERENCED_BY",
        REFERENCES = "REFERENCES",
        IS_DOCUMENTED_BY = "IS_DOCUMENTED_BY",
        DOCUMENTS = "DOCUMENTS",
        IS_COMPILED_BY = "IS_COMPILED_BY",
        COMPILES = "COMPILES",
        IS_VARIANT_FORM_OF = "IS_VARIANT_FORM_OF",
        IS_ORIGINAL_FORM_OF = "IS_ORIGINAL_FORM_OF",
        IS_IDENTICAL_TO = "IS_IDENTICAL_TO",
        HAS_METADATA = "HAS_METADATA",
        IS_METADATA_FOR = "IS_METADATA_FOR",
        REVIEWS = "REVIEWS",
        IS_REVIEWED_BY = "IS_REVIEWED_BY",
        IS_DERIVED_FROM = "IS_DERIVED_FROM",
        IS_SOURCE_OF = "IS_SOURCE_OF",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum ResourceType {
        AUDIOVISUAL = "AUDIOVISUAL",
        COLLECTION = "COLLECTION",
        DATASET = "DATASET",
        EVENT = "EVENT",
        IMAGE = "IMAGE",
        INTERACTIVE_RESOURCE = "INTERACTIVE_RESOURCE",
        MODEL = "MODEL",
        PHYSICAL_OBJECT = "PHYSICAL_OBJECT",
        SERVICE = "SERVICE",
        SOFTWARE = "SOFTWARE",
        SOUND = "SOUND",
        TEXT = "TEXT",
        WORKFLOW = "WORKFLOW",
        OTHER = "OTHER",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum SchemaType {
        FILE = "FILE",
        DATABASE = "DATABASE",
    }

}

export namespace eu.intelcomp.xsd2java {

    export const enum TitleType {
        ALTERNATIVE_TITLE = "ALTERNATIVE_TITLE",
        SUBTITLE = "SUBTITLE",
        TRANSLATED_TITLE = "TRANSLATED_TITLE",
    }

}
