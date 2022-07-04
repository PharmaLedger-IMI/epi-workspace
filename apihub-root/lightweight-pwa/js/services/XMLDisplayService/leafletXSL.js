const defualtXslContent = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="urn:hl7-org:v3"
                xmlns="urn:hl7-org:v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="urn:hl7-org:v3 https://www.accessdata.fda.gov/spl/schema/spl.xsd">
    <xsl:output method="html"/>

    <!--setting identity transformation-->
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="xs:document">
        <div class="accordion">
            <xsl:apply-templates select="@*|node()"/>
        </div>
    </xsl:template>

    <xsl:template match="xs:document/xs:component">
        <xsl:apply-templates select="@*|node()"/>
    </xsl:template>

    <xsl:template match="xs:component/xs:structuredBody">
        <xsl:apply-templates select="@*|node()"/>
    </xsl:template>

    <xsl:template match="xs:structuredBody/xs:component">
        <xsl:apply-templates select="@*|node()"/>
    </xsl:template>

    <xsl:template match="xs:paragraph">
        <p>
            <xsl:apply-templates select="@*|node()"/>
        </p>
    </xsl:template>

    <xsl:template match="xs:list">
        <ul>
            <xsl:apply-templates select="@*|node()"/>
        </ul>
    </xsl:template>

    <xsl:template match="xs:item">
        <li>
            <xsl:apply-templates select="@*|node()"/>
        </li>
    </xsl:template>

    <xsl:template match="xs:linkHtml">
        <xsl:variable name="_href">
            <xsl:value-of select="@href"/>
        </xsl:variable>
        <xsl:variable name="firstLetter" select="substring($_href,1,1)"/>
        <xsl:choose>
            <xsl:when test="$firstLetter != '#'">
                <a target="_blank">
                    <xsl:attribute name="href">
                        <xsl:value-of select="@href"/>
                    </xsl:attribute>
                    <xsl:value-of select="."/>
                </a>
            </xsl:when>
            <xsl:otherwise>
                <span class="leaflet-link">
                    <xsl:attribute name="linkUrl">
                        <xsl:value-of select="@href"/>
                    </xsl:attribute>
                    <xsl:value-of select="."/>
                </span>
            </xsl:otherwise>
        </xsl:choose>

    </xsl:template>

    <xsl:template match="xs:section">
        <xsl:choose>
            <xsl:when test="xs:code/@displayName != 'SPL LISTING DATA ELEMENTS SECTION'">
                <div class="leaflet-accordion-item">
                    <xsl:attribute name="sectionCode">
                        <xsl:value-of select="xs:code/@code"/>
                    </xsl:attribute>
                    <h5>
                        <!--<xsl:value-of select="xs:code/@displayName"/>-->
                        <xsl:variable name="partialTitle" select="substring(xs:code/@displayName,2)"/>
                        <xsl:variable name="firstLetter" select="substring(xs:code/@displayName,1,1)"/>
                        <xsl:variable name="modifiedTitle">
                            <xsl:value-of
                                    select="concat($firstLetter,translate($partialTitle,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))"/>
                        </xsl:variable>
                        <xsl:value-of select="$modifiedTitle"/>
                    </h5>
                    <div class="leaflet-accordion-item-content">
                        <xsl:apply-templates select="@*|node()"/>
                    </div>
                </div>
            </xsl:when>
            <xsl:otherwise></xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="xs:section/xs:component/xs:section">
        <div>
            <h3>
                <!--<xsl:value-of select="xs:code/@displayName"/>-->
                <xsl:variable name="partialTitle" select="substring(xs:code/@displayName,2)"/>
                <xsl:variable name="firstLetter" select="substring(xs:code/@displayName,1,1)"/>
                <xsl:variable name="modifiedTitle">
                    <xsl:value-of
                            select="concat($firstLetter,translate($partialTitle,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))"/>
                </xsl:variable>
                <xsl:value-of select="$modifiedTitle"/>
            </h3>
            <div>
                <xsl:apply-templates select="@*|node()"/>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="xs:content">
        <xsl:choose>
            <xsl:when test="@styleCode = 'bold'">
                <b>
                    <xsl:value-of select="."/>
                </b>
            </xsl:when>
            <xsl:when test="@styleCode = 'underline'">
                <u>
                    <xsl:value-of select="."/>
                </u>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="."/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="xs:renderMultiMedia">
        <xsl:apply-templates select="//xs:observationMedia[@ID=current()/@referencedObject]"/>
    </xsl:template>

    <xsl:template match="xs:observationMedia">
        <img>
            <xsl:attribute name="src">
                <xsl:value-of select="concat($resources_path, xs:value/xs:reference/@value)"/>
            </xsl:attribute>
            <xsl:attribute name="alt">
                <xsl:value-of select="xs:text"/>
            </xsl:attribute>
        </img>
    </xsl:template>

    <xsl:template match="xs:document/xs:title">
        <accordion-item>
            <xsl:attribute name="shadow"/>
            <xsl:attribute name="title">
                Highlights of prescribing information
            </xsl:attribute>
            <!-- <xsl:attribute name="opened">
                opened
            </xsl:attribute> -->
            <div class="accordion-item-content" slot="item-content">
                <xsl:apply-templates select="@*|node()"/>
            </div>
        </accordion-item>
    </xsl:template>

    <!--nodes or attributes that we need to hide for a cleaner output-->
    <xsl:template
            match="xs:author|xs:id|xs:document/xs:code|xs:document/xs:effectiveTime|xs:document/xs:setId|xs:document/xs:versionNumber">
        <!--hide selected nodes-->
    </xsl:template>
</xsl:stylesheet>`

const acordisXslContent = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" version="1.0"
                encoding="UTF-8" indent="yes" doctype-public="-//W3C//DTD XHTML 1.1//EN"/>

    <!--setting identity transformation-->
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="document">
            <div><xsl:apply-templates select="@*|node()"/></div>
    </xsl:template>

    <xsl:template match="document/p[@class='Type']">
        <div style="display:none;" class="ignored_from_ui">
            <xsl:apply-templates select="node()">
            </xsl:apply-templates>
        </div>
    </xsl:template>

    <xsl:template match="document/p[@class='Product_Name']">
        <h1 style="display:none;" class="ignored_from_ui">
            <xsl:apply-templates select="node()">
            </xsl:apply-templates>
        </h1>
    </xsl:template>

    <xsl:template match="document/p[@class='Ingredient Substance']">
        <p class="ingredient_substance ignored_from_ui" style="display:none;">
            <span>
                <b><xsl:value-of select="@class"/>:</b>
            </span>
            <span>
                <xsl:apply-templates select="@*|node()"></xsl:apply-templates>
            </span>
        </p>
    </xsl:template>

    <xsl:template match="document/p[@class='Read Instructions'][1]">
        <xsl:text disable-output-escaping='yes'>&lt;div class="read_instructions" style="display:none;" class="ignored_from_ui" &gt;</xsl:text>
        <p style="display:none;" class="ignored_from_ui"><xsl:apply-templates select="node()" /></p>
    </xsl:template>

    <xsl:template match="document/p[@class='Read Instructions'][position()>1 and position()&lt;last()]">
        <p style="display:none;" class="ignored_from_ui"><xsl:apply-templates select="node()" /></p>
    </xsl:template>

    <xsl:template match="document/p[@class='Read Instructions'][last()]">
        <p style="display:none;" class="ignored_from_ui"><xsl:apply-templates select="node()" /></p>
        <xsl:text disable-output-escaping='yes'>&lt;/div&gt;</xsl:text>
    </xsl:template>

    <xsl:template match="document/p[@class='Table of Content'][1]">
        <xsl:text disable-output-escaping='yes'>&lt;div class="table_of_content ignored_from_ui" style="display:none;" &gt;</xsl:text>
        <h2 style="display:none;" class="ignored_from_ui"><xsl:apply-templates select="node()" /></h2>
    </xsl:template>

    <xsl:template match="document/p[@class='Table of Content'][position()>1 and position()&lt;last()]">
        <p style="display:none;" class="ignored_from_ui"><xsl:apply-templates select="node()" /></p>
    </xsl:template>

    <xsl:template match="document/p[@class='Table of Content'][last()]">
        <p style="display:none;" class="ignored_from_ui"><xsl:apply-templates select="node()" /></p>
        <xsl:text disable-output-escaping='yes'>&lt;/div&gt;</xsl:text>
    </xsl:template>
    
        <xsl:template match="document/section">
        <div class="section leaflet-accordion-item">
            <xsl:apply-templates select="header"/>
                <div class="leaflet-accordion-item-content">
                     <xsl:apply-templates select="*[not(self::header)]"/>
                </div>
        </div>
    </xsl:template>
    
    
    <xsl:template match="document/section/header">
        <h5>
            <xsl:apply-templates select="node()" />
        </h5>
    </xsl:template>

    <xsl:template match="document/section/p">
        <p><xsl:apply-templates select="node()" /></p>
    </xsl:template>
    
    <xsl:template match="//ul">
        <ul><xsl:apply-templates select="node()" /></ul>
    </xsl:template>

    <xsl:template match="//ul/li">
        <li><xsl:apply-templates select="node()" /></li>
    </xsl:template>

    <xsl:template match="//ol">
        <ol><xsl:apply-templates select="node()" /></ol>
    </xsl:template>

    <xsl:template match="//ol/li">
        <li><xsl:apply-templates select="node()" /></li>
    </xsl:template>

    <xsl:template match="//section//p">
        <p><xsl:apply-templates select="node()" /></p>
    </xsl:template>

    <xsl:template match="//figure">
        <figure><xsl:apply-templates select="node()" /></figure>
    </xsl:template>

    <xsl:template match="//figure/p">
        <p style="display:none;" class="ignored_from_ui"><xsl:apply-templates select="node()" /></p>
    </xsl:template>

    <xsl:template match="//table">
        <table><xsl:apply-templates select="node()" /></table>
    </xsl:template>

    <xsl:template match="//tr">
        <tr><xsl:apply-templates select="node()" /></tr>
    </xsl:template>

</xsl:stylesheet>`;

export {
  defualtXslContent,
  acordisXslContent
};
