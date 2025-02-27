import { test } from '@japa/runner'

test.group('Structures delete', () => {
  test('should return 401 if user is not authenticated').tags(['structures'])

  test('should return 403 if user is not the owner of the structure').tags(['structures'])

  test('should return 404 if structure is not found').tags(['structures'])

  test('should return 204 if structure is deleted').tags(['structures'])
})
