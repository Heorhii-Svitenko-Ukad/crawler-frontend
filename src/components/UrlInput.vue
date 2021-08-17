<template>
    <div class="container">
        <div>
            <form class="input-group" @submit.prevent="onFormSubmit">
                <input class="form-control" 
                    :class="{'is-invalid': $v.url.$error}" 
                    @blur="$v.url.$touch()" 
                    v-model="url" 
                    type="url" 
                    placeholder="URL" />
                <div>
                    <b-spinner v-if="isLoading" class="mx-2 pt-5" variant="primary"></b-spinner>
                    <button v-else type="submit" class="btn btn-success">Crawl</button>
                </div>
                <div class="invalid-feedback" v-if="!$v.url.required">Url field is required</div>
                <div class="invalid-feedback" v-if="!$v.url.url">Url field is invalid</div>
                <div class="invalid-feedback" v-if="!$v.url.isSchemaValid">Url schema is invalid</div>
            </form>
        </div>
    </div>
</template>

<script>
import { url, required } from 'vuelidate/lib/validators'
export default {
    data () {
        return {
            resource: null,
            url: '',
            isLoading: false
        }
    },
    validations: {
        url: {
            url,
            required,
            isSchemaValid (input) {
                return input.startsWith('http://') || input.startsWith('https://')
            }
        }
    },
    methods: {
        onFormSubmit() {
            this.isLoading = true
            this.resource.save(null, {'Url': this.url})
                .then(response => response.json())
                .then(json => {
                    if (json.isSuccessful) {
                        this.isLoading = false
                        this.$emit('onUpdate')
                    }                    
                })
        }
    },
    created() {
        this.resource = this.$resource('tests')
    }
}
</script>