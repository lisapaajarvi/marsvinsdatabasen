import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import { app } from '../../firebaseConfig';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    User,
} from 'firebase/auth';
import { useState } from 'react';
import router from 'next/router';

export default function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['Logga in', 'Registrera dig']);
    const [user, setUser] = useState({} as User);
    const auth = getAuth(app);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) =>
                /^\S+@\S+$/.test(val) ? null : 'Ogiltig emailadress',
            password: (val) =>
                val.length <= 6 ? 'Lösenordet måste vara minst 6 tecken' : null,
        },
    });

    const signup = (values: {
        email: any;
        name?: string;
        password: any;
        terms?: boolean;
    }) => {
        if (type === 'Registrera dig') {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    setUser(user);
                    form.reset();
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
            if (values.name) {
                updateProfile(user, {
                    displayName: values.name,
                })
                    .then(() => {
                        router.push('/');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });
            }
        } else {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    form.reset();
                    router.push('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    form.reset();
                });
        }
    };

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" weight={500}>
                Välkommen till Marsvinsdatabasen
            </Text>

            <form onSubmit={form.onSubmit((values) => signup(values))}>
                <Stack>
                    {type === 'Registrera dig' && (
                        <TextInput
                            label="Namn"
                            placeholder="Marsvin Marsvinsson"
                            value={form.values.name}
                            onChange={(event) =>
                                form.setFieldValue(
                                    'name',
                                    event.currentTarget.value
                                )
                            }
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hej@marsvin.nu"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue(
                                'email',
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.email && 'Ogiltig emailadress'}
                    />

                    <PasswordInput
                        required
                        label="Lösenord"
                        placeholder="Lösenord"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                'password',
                                event.currentTarget.value
                            )
                        }
                        error={
                            form.errors.password &&
                            'Lösenordet måste innehålla minst 6 tecken'
                        }
                    />

                    {type === 'registrera dig' && (
                        <Checkbox
                            label="Jag godkänner villkoren"
                            checked={form.values.terms}
                            onChange={(event) =>
                                form.setFieldValue(
                                    'terms',
                                    event.currentTarget.checked
                                )
                            }
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'Registrera dig'
                            ? 'Har du redan ett konto? Logga in'
                            : 'Har du inget konto? Registrera dig'}
                    </Anchor>
                    <Button type="submit">{type}</Button>
                </Group>
            </form>
        </Paper>
    );
}
