<template>
    <div>
        <h1>Test details</h1>
        <button class="btn btn-outline-info" @click="goBack">Go back to tests</button>
        <links-table title="Performance" :links="links"></links-table>
        <links-table title="URLs NOT FOUND AT WEBSITE" :links="sitemap"></links-table>
        <links-table title="URLs NOT FOUND AT SITEMAP" :links="site"></links-table>

    </div>
</template>

<script>
import LinksTable from '../components/LinksTable.vue'
export default {
    components: {
        'links-table': LinksTable
    },
    data() {
        return {
            links: [],
            sitemap: [],
            site: [],
            id: this.$router.currentRoute.params['testId']
        }
    },
    methods: {
        getTests() {
            this.resource.get({testId: this.id}).then(response => response.json()).then(json => {
                if (json.isSuccessful) {
                    this.links = json.result.map(test => this.mapJsonToLinkWithTime(test))

                    this.site = json.result.filter(function (item) {
                        return item.isFromCrawl && !item.isFromSitemap
                    }).map(test => this.mapJsonToLink(test))
                    
                    this.sitemap = json.result.filter(function (item) {
                        return !item.isFromCrawl && item.isFromSitemap
                    }).map(test => this.mapJsonToLink(test))
                }
            })
        },
        mapJsonToLinkWithTime(link) {
            return {
                        'uri': link.uri,
                        'response_time_(ms)': (link.responseTime.ticks / 10000).toFixed(4)
            }
        },
        mapJsonToLink(link) {
            return {
                        'uri': link.uri
            }
        },
        goBack() {
            this.$router.push({name: 'Home'})
        }
    },
    created() {
        this.resource = this.$resource('tests{/testId}')
        this.getTests()
    }
}
</script>