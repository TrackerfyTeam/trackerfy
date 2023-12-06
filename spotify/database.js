const playlist = {
    "1970": "37i9dQZF1DWXQyLTHGuTIz",
    "1971": "37i9dQZF1DX43B4ApmA3Ee",
    "1972": "37i9dQZF1DXaQBa5hAMckp",
    "1973": "37i9dQZF1DX2ExTChOnD3g",
    "1974": "37i9dQZF1DWVg6L7Yq13eC",
    "1975": "37i9dQZF1DX3TYyWu8Zk7P",
    "1976": "37i9dQZF1DX6rhG68uMHxl",
    "1977": "37i9dQZF1DX26cozX10stk",
    "1978": "37i9dQZF1DX0fr2A59qlzT",
    "1979": "37i9dQZF1DWZLO9LcfSmxX",
    "1980": "37i9dQZF1DWXbLOeOIhbc5",
    "1981": "37i9dQZF1DX3MaR62kDrX7",
    "1982": "37i9dQZF1DXas7qFgKz9OV",
    "1983": "37i9dQZF1DXbE3rNuDfpVj",
    "1984": "37i9dQZF1DX2O7iyPnNKby",
    "1985": "37i9dQZF1DWXZ5eJ1sVtmf",
    "1986": "37i9dQZF1DX7b12kdMQTpG",
    "1987": "37i9dQZF1DX38yySwWsFRT",
    "1988": "37i9dQZF1DX3MZ9dVGvZnZ",
    "1989": "37i9dQZF1DX4qJrOCfJytN",
    "1990": "37i9dQZF1DX4joPVMjBCAo",
    "1991": "37i9dQZF1DX6TtJfRD994c",
    "1992": "37i9dQZF1DX9ZZCtVNwklG",
    "1993": "37i9dQZF1DXbUFx5bcjwWK",
    "1994": "37i9dQZF1DXbKFudfYGcmj",
    "1995": "37i9dQZF1DXayIOFUOVODK",
    "1996": "37i9dQZF1DWZkDl55BkJmo",
    "1997": "37i9dQZF1DWWKd15PHZNnl",
    "1998": "37i9dQZF1DWWmGB2u14f8m",
    "1999": "37i9dQZF1DX4PrR66miO50",
    "2000": "37i9dQZF1DWUZv12GM5cFk",
    "2001": "37i9dQZF1DX9Ol4tZWPH6V",
    "2002": "37i9dQZF1DX0P7PzzKwEKl",
    "2003": "37i9dQZF1DXaW8fzPh9b08",
    "2004": "37i9dQZF1DWTWdbR13PQYH",
    "2005": "37i9dQZF1DWWzQTBs5BHX9",
    "2006": "37i9dQZF1DX1vSJnMeoy3V",
    "2007": "37i9dQZF1DX3j9EYdzv2N9",
    "2008": "37i9dQZF1DWYuGZUE4XQXm",
    "2009": "37i9dQZF1DX4UkKv8ED8jp",
    "2010": "37i9dQZF1DXc6IFF23C9jj",
    "2011": "37i9dQZF1DXcagnSNtrGuJ",
    "2012": "37i9dQZF1DX0yEZaMOXna3",
    "2013": "37i9dQZF1DX3Sp0P28SIer",
    "2014": "37i9dQZF1DX0h0QnLkMBl4",
    "2015": "37i9dQZF1DX9ukdrXQLJGZ",
    "2016": "37i9dQZF1DX8XZ6AUo9R4R",
    "2017": "37i9dQZF1DWTE7dVUebpUW",
    "2018": "37i9dQZF1DXe2bobNYDtW8",
    "2019": "37i9dQZF1DWVRSukIED0e9",
    "2020": "2fmTTbBkXi8pewbUvG3CeZ",
    "2021": "5GhQiRkGuqzpWZSE7OU4Se",
    "2022": "56r5qRUv3jSxADdmBkhcz7",
    "2023": "7kXId9O5f13vCcLVISaoSk",
}

function getPlaylistByYear(year) {
    let yearString = String(year)
    const playlistId = playlist[yearString]
    return playlistId
}

function getPlaylists() {
    const years = Object.keys(playlist).map(year => {
        return {
            ano: year
        }
    })
    return years
}

module.exports = {getPlaylistByYear, getPlaylists}