export default function apiResponse(data, message = 'Success', success = true) {
    return {
        success: success,
        data : data,
        message : message
    }
}